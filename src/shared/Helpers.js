/* eslint-disable object-curly-newline,prefer-destructuring,no-multi-spaces */
import SourceVector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import WKT from 'ol/format/WKT';
import Feature from 'ol/Feature';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { applyTransform } from 'ol/extent';
import { get as getProjection, getTransform } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { axiosInstance } from 'plugins/axios';
import Constants from 'shared/Constants';
import store from 'store/index';
import Style from 'ol/style/Style';
import { colors } from 'quasar';
import { MAP_CONSTANTS, MAP_STYLES, MAP_STYLE_ELEMENTS } from './MapConstants';

const reRGBA = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
const { hexToRgb, getBrand, rgbToHex } = colors;

/**
 * Helpers functions shared between components.
 * A plugin (helper.js) is called to link function to Vue instance ($helpers)
 * Same js file is used to expose Constants
 * @type {{
 * validateJsonSchema: (function(*=, *=): *),
 * capitalizeFirstLetter: (function(*): string),
 * pushElementInFixedQueue: (function(*, *=)),
 * formatExtent: (function(*=)),
 * }}
 */
const Helpers = {

  /**
   * Capitalize first letter of string
   * @param str the string to capitalize
   */
  capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),

  /**
   * Push an element in a queue with a max length (all history queue)
   * @param array array to push element
   * @param element element to push
   * @param maxLenght max array length (optional). If not indicated
   * Constants.HIST_MAX_LENGTH is used
   */
  pushElementInFixedQueue: (array, element, maxLenght = Constants.HIST_MAX_LENGTH) => {
    array.push(element);
    if (array.length > maxLenght) {
      array.shift();
    }
  },

  /**
   * Return last element of log array filtered by type (or not)
   * @param log the log array
   * @param type one of Constants.TYPE_[DEBUG | INFO | WARNING | ERROR | ALL]
   * @returns last element of type or null if log is empry
   */
  lastFilteredLogElement: (log, type) => {
    if (log.length === 0) {
      return null;
    }
    if (type === undefined) {
      return log[log.length - 1];
    }
    const last = [...log].reverse().find(logAction => logAction.type === type);
    if (typeof last !== 'undefined') {
      return last;
    }
    return null;
  },

  /**
   * Utility method to print coordinates with only 2 decimals
   * TODO: probably not needed
   * @param extent
   * @returns {*}
   */
  // formatExtent: extent => extent, -> Used in case of test of no validating message
  formatExtent: (localExtent) => {
    if (localExtent) {
      return [localExtent.south.toFixed(2), localExtent.west.toFixed(2),
        localExtent.north.toFixed(2), localExtent.east.toFixed(2)];
    }
    return null;
  },

  /**
   * Search a node using a property
   * @param tree the tree where to look for node
   * @param key the node key value
   */
  findNodeById(tree, key = null) {
    if (tree && key !== null) {
      const { reduce } = [];
      const find = (result, node) => {
        if (result || !node) {
          return result;
        }
        if (Array.isArray(node)) {
          return reduce.call(Object(node), find, result);
        }
        if (node.id === key) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          return find(null, node.children);
        }
        return null;
      };
      return find(null, tree);
    }
    return null;
  },

  /**
   * Return a node object from an observation
   * @param observation
   */
  getNodeFromObservation: observation => ({
    node: {
      id: observation.id,
      label: observation.literalValue || observation.label,
      observable: observation.observable,
      type: observation.shapeType,
      viewerIdx: observation.viewerIdx,
      children: [],
      tickable: observation.viewerIdx !== null && !observation.empty,
      disabled: observation.empty,
      actions: observation.actions,
      header: 'default',
      folderId: observation.folderId,
      main: observation.main,
    },
    parentId: observation.folderId === null ? observation.parentId : observation.folderId,
  }),

  /**
   * If we need a new projection, a call to epsg.io is maded to retrieve
   * projection definition and register it.
   * For now, it live until browser close
   * TODO implement browser database support
   * @param projection
   * @returns {Promise}
   */
  registerProjection(projection) { // projection in format ESPG:XXXXX
    return new Promise((resolve, reject) => {
      const toAsk = projection.substring(5); // ask without ESPG
      fetch(`https://epsg.io/?format=json&q=${toAsk}`)
        .then(response => response.json().then((json) => {
          const { results } = json;
          if (results && results.length > 0) {
            for (let i = 0, ii = results.length; i < ii; i += 1) {
              const result = results[i];
              if (result) {
                const { code, proj4: proj4def, bbox } = result;
                if (code && code.length > 0 && proj4def && proj4def.length > 0
                  && bbox && bbox.length === 4) {
                  const newProjCode = `EPSG:${code}`;
                  proj4.defs(newProjCode, proj4def);
                  register(proj4);
                  const newProj = getProjection(newProjCode);
                  const fromLonLat = getTransform(MAP_CONSTANTS.PROJ_EPSG_4326, newProj);
                  // very approximate calculation of projection extent
                  const extent = applyTransform([bbox[1], bbox[2], bbox[3], bbox[0]], fromLonLat);
                  newProj.setExtent(extent);
                  console.log(`New projection registered: ${newProjCode}`);
                  resolve(newProj);
                } else {
                  reject(new Error(`Some error in projection search result: ${JSON.stringify(result)}`));
                }
              } else {
                reject(new Error('Some error in projection search result: no results'));
              }
            }
          } else {
            reject(new Error(`Unknown projection: ${projection}`));
          }
        }));
    });
  },

  /**
   * Return the geometry of context.
   * Now getLayerObject only work with observation
   * @param contextObservation
   * @returns {Promise.<module:ol/geom/Geometry>}
   */
  async getContextGeometry(contextObservation) {
    let dataProjection;
    const { spatialProjection } = contextObservation;
    if (spatialProjection !== null) {
      dataProjection = getProjection(spatialProjection);
      if (dataProjection === null) { // unknows projection, need ask for it
        dataProjection = await this.registerProjection(spatialProjection);
      }
    } else {
      dataProjection = MAP_CONSTANTS.PROJ_EPSG_4326;
    }
    let { encodedShape } = contextObservation;
    // normalize encodedShape
    if (encodedShape.indexOf('LINEARRING') === 0) {
      encodedShape = encodedShape.replace('LINEARRING', 'LINESTRING');
    }
    const geometry = new WKT().readGeometry(encodedShape, {
      dataProjection,
      featureProjection: MAP_CONSTANTS.PROJ_EPSG_3857,
    });
    contextObservation.zIndexOffset = 0; // is context, remaind it
    return geometry;
  },

  isRaster(observation = null) {
    if (observation === null) {
      return false;
    }
    const { geometryTypes } = observation;
    return geometryTypes && typeof geometryTypes.find(gt => gt === Constants.GEOMTYP_RASTER) !== 'undefined';
  },

  getAxiosContent(uid, url, params, callback) {
    store.dispatch('view/setSpinner', { ...Constants.SPINNER_LOADING, owner: uid }, { root: true });
    axiosInstance.get(url, {
      params,
    })
      .then((response) => {
        if (response) {
          callback(response, () => {
            store.dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: uid }, { root: true });
          });
        }
      })
      .catch((error) => {
        store.dispatch('view/setSpinner', {
          ...Constants.SPINNER_ERROR,
          owner: uid,
          errorMessage: error,
        }, { root: true });
        throw error;
      });
  },

  /**
   * Build a layer object. If needed ask for projection (reason for async function)
   * @param observation the observations: needed for projection ad type of representation
   * @param isContext if is context, a lot of thing are not needed
   * @param viewport not used for now. If not setted, for now is the double of height/width of browser
   * @return layer
   */
  async getLayerObject(observation, { viewport = null /* , projection = null */ }) {
    // const { geometryTypes } = observation;
    const isRaster = this.isRaster(observation); // geometryTypes && typeof geometryTypes.find(gt => gt === Constants.GEOMTYP_RASTER) !== 'undefined';
    let spatialProjection;
    if (isRaster) {
      if (observation.parentId === store.state.data.context.id) {
        spatialProjection = store.state.data.context.spatialProjection;
      } else {
        const parent = this.findNodeById(store.state.data.tree, observation.parentId);
        if (parent !== null && parent.spatialProjection) {
          spatialProjection = parent.spatialProjection;
        } else {
          console.log(`Unknown parent with id ${observation.parentId}`);
        }
      }
    } else {
      spatialProjection = observation.spatialProjection;
    }

    let dataProjection;
    if (spatialProjection !== null) {
      dataProjection = getProjection(spatialProjection);
      if (dataProjection === null) { // unknows projection, need ask for it
        dataProjection = await this.registerProjection(spatialProjection);
      }
    } else {
      dataProjection = MAP_CONSTANTS.PROJ_EPSG_4326;
    }
    let { encodedShape } = observation;
    // normalize encodedShape
    if (encodedShape.indexOf('LINEARRING') === 0) {
      encodedShape = encodedShape.replace('LINEARRING', 'LINESTRING');
    }
    const geometry = new WKT().readGeometry(encodedShape, {
      dataProjection,
      featureProjection: MAP_CONSTANTS.PROJ_EPSG_3857,
    });

    // check if the layer is a raster
    if (isRaster) {
      // z-index offset = 0, raster is down
      observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_OFFSET * MAP_CONSTANTS.ZINDEX_MULTIPLIER_RASTER;
      if (viewport === null) {
        viewport = Math.max(document.body.clientHeight, document.body.clientWidth) * Constants.PARAM_VIEWPORT_MULTIPLIER;
        // console.log(`Viewport: ${viewport} calculated using clientHeight: ${document.body.clientHeight} and clientwidth: ${document.body.clientWidth}`);
      } else if (viewport > Constants.PARAM_VIEWPORT_MAX_SIZE) {
        viewport = Constants.PARAM_VIEWPORT_MAX_SIZE;
      }
      const layerExtent = geometry.getExtent();
      const url = `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${observation.id}`;
      // const url = 'http://localhost:8080/statics/klab-logo.png';
      const source = new Static({
        projection: MAP_CONSTANTS.PROJ_EPSG_3857,
        // projection: dataProjection,
        imageExtent: layerExtent,
        // imageSize: [800, 800], // extent.getSize(layerExtent),
        url,
        style: MAP_STYLES.POLYGON_OBSERVATION_STYLE,
        imageLoadFunction: (imageWrapper, src) => {
          store.dispatch('view/setSpinner', { ...Constants.SPINNER_LOADING, owner: src }, { root: true });
          axiosInstance.get(src, {
            params: {
              format: Constants.GEOMTYP_RASTER,
              viewport,
            },
            responseType: 'blob',
          })
            .then((response) => {
              if (response) {
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = () => {
                  const image = imageWrapper.getImage();
                  image.src = reader.result;
                  store.dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: src }, { root: true });
                  // load colormap if necesary
                  Helpers.getAxiosContent(`cm_${observation.id}`, url, { format: 'COLORMAP' }, (colormapResponse, colormapCallback) => {
                    if (colormapResponse && colormapResponse.data) {
                      observation.colormap = colormapResponse.data;
                    }
                    colormapCallback();
                  });
                };
                reader.onerror = (error) => {
                  store.dispatch('view/setSpinner', {
                    ...Constants.SPINNER_ERROR,
                    owner: src,
                    errorMessage: error,
                  }, { root: true });
                };
              }
            })
            .catch((error) => {
              store.dispatch('view/setSpinner', {
                ...Constants.SPINNER_ERROR,
                owner: src,
                errorMessage: error,
              }, { root: true });
              throw error;
            });
        },
      });
      return new ImageLayer({
        id: observation.id,
        source,
      });
    }

    let layerStyle;

    if (encodedShape.indexOf('LINESTRING') === 0 || encodedShape.indexOf('MULTILINESTRING') === 0) {
      layerStyle = MAP_STYLES.LNE_OBSERVATION_STYLE;
      observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_OFFSET * MAP_CONSTANTS.ZINDEX_MULTIPLIER_LINES;
    } else if (encodedShape.indexOf('POINT') === 0 || encodedShape.indexOf('MULTIPOINT') === 0) {
      const text = MAP_STYLE_ELEMENTS.POINT_OBSERVATION_TEXT.clone();
      // TODO check this # = %23 to do something a little better
      const image = MAP_STYLE_ELEMENTS.POINT_OBSERVATION_SVG_ICON({ fill: '%23eee', stroke: '%23333', strokeWidth: '4' }).clone();

      text.setText(observation.label);
      layerStyle = new Style({
        image,
        text,
      });
      observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_OFFSET * MAP_CONSTANTS.ZINDEX_MULTIPLIER_POINTS;
    } else {
      layerStyle = MAP_STYLES.POLYGON_OBSERVATION_STYLE;
      observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_OFFSET * MAP_CONSTANTS.ZINDEX_MULTIPLIER_POLYGONS;
    }

    const feature = new Feature({
      geometry,
      name: observation.label,
      id: observation.id,
    });

    const vectorLayer = new VectorLayer({
      id: observation.id,
      source: new SourceVector({
        features: [feature],
      }),
      style: layerStyle,
    });

    return vectorLayer;
  },

  * reverseKeys(arr) {
    let key = arr.length - 1;

    while (key >= 0) {
      yield key;
      key -= 1;
    }
  },

  textToRgb: (color) => {
    if (typeof color !== 'string') {
      throw new TypeError('Expected a string');
    }

    const m = reRGBA.exec(color);
    if (m) {
      const rgb = {
        r: parseInt(m[1], 10),
        g: parseInt(m[2], 10),
        b: parseInt(m[3], 10),
      };
      if (m[4]) {
        rgb.a = parseFloat(m[4]);
      }
      return rgb;
    }
    return hexToRgb(color);
  },

  /**
   * Receive an hex value (#), rgb (rgb()) or brand ('primary')
   * Return the correspondent rgb and hex value
   * @param color an hex value (#), rgb (rgb()) or brand ('primary')
   * @returns {{rgb: *, hex: *, color: *}}
   */
  getColorObject(color) {
    let rgb;
    let hex;
    if (color.indexOf('#') === 0) {
      hex = color;
      rgb = hexToRgb(color);
    } else if (color.indexOf(',') !== -1) {
      rgb = this.textToRgb(color);
      hex = rgbToHex(rgb);
    } else {
      hex = getBrand(color);
      rgb = hexToRgb(hex);
    }
    return {
      rgb,
      hex,
      color,
    };
  },

  /**
   * Copy text to clipboard
   * Code from Angelos Chalaris @see https://hackernoon.com/@chalarangelo
   * @param str string to copy
   */
  copyToClipboard: (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },

  uniqueArray: array => array.filter((elem, pos, arr) => arr.indexOf(elem) === pos),

  /**
   * DEFAULT Viewer on start
   */
  OBSERVATION_DEFAULT: {
    shapeType: 'POINT',
    encodedShape: 'POINT (40.299841 9.343971)',
    id: null,
    label: 'DEFAULT',
    parentId: -1,
    visible: true,
    spatialProjection: 'EPSG:4326',
    observationType: Constants.OBSTYP_INITIAL,
  },
};

export { Constants, Helpers };
