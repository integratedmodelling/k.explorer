/* eslint-disable object-curly-newline,prefer-destructuring */
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import WKT from 'ol/format/WKT';
import Feature from 'ol/Feature';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { applyTransform } from 'ol/extent.js';
import { get as getProjection, getTransform } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';
import { axiosInstance } from 'plugins/axios';
import Constants from 'shared/Constants';
import store from 'store/index';


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
   * Search the parent with the key
   * @param tree the tree where to look for parent
   * @param key the parent key
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

  addToTree: (commit, { observation, needViewer, folderId }) => {
    commit('ADD_NODE', {
      node: {
        id: observation.id,
        label: observation.literalValue || observation.label,
        type: observation.shapeType,
        viewerIdx: observation.viewerIdx,
        children: [],
        noTick: !needViewer,
        folderId,
      },
      parentId: folderId === null ? observation.parentId : folderId,
    });
  },
  /*
  getCoord: (allCoords, dataProjection = Constants.DEFAULT_PROJ_DATA) => {
    const coords = [];
    for (let i = 0, j = 0; i < allCoords.length; i += 1) {
      if (i >= 2 && i % 2 === 0) {
        j += 1;
      }
      coords[j] = coords[j] || [];
      coords[j].push(allCoords[i]);
    }
    const polyCoords = [];
    coords.forEach((pair) => {
      polyCoords.push(proj.transform([parseFloat(pair[0]), parseFloat(pair[1])], dataProjection, Constants.DEFAULT_PROJ_VIEW));
    });
    return polyCoords;
  },
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
                if (code && code.length > 0 && proj4def && proj4def.length > 0 &&
                  bbox && bbox.length === 4) {
                  const newProjCode = `EPSG:${code}`;
                  proj4.defs(newProjCode, proj4def);
                  register(proj4);
                  const newProj = getProjection(newProjCode);
                  const fromLonLat = getTransform(Constants.PROJ_EPSG_4326, newProj);
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


  async getLayerObject(observation, { isContext = false, viewport = null /* , projection = null */ }) {
    const { geometryTypes } = observation;
    const isRaster = geometryTypes && typeof geometryTypes.find(gt => gt === Constants.GEOMTYP_RASTER) !== 'undefined';
    let spatialProjection;
    if (isRaster) {
      if (observation.parentId === store.state.data.context.id) {
        spatialProjection = store.state.data.context.spatialProjection;
      } else {
        spatialProjection = this.findNodeById(store.state.data.tree, observation.parentId).spatialProjection;
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
      dataProjection = Constants.PROJ_EPSG_4326;
    }
    const { encodedShape } = observation;
    // normalize encodedShape
    if (encodedShape.indexOf('LINEARRING') === 0) {
      encodedShape.replace('LINEARRING', 'LINESTRING');
    }
    const geometry = new WKT().readGeometry(encodedShape, {
      dataProjection,
      featureProjection: Constants.PROJ_EPSG_3857,
    });

    // check if the layer is a raster
    if (isRaster) {
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
        projection: getProjection(Constants.PROJ_EPSG_3857),
        imageExtent: layerExtent,
        // imageSize: [800, 800], // extent.getSize(layerExtent),
        url,
        style: Constants.POLYGON_OBSERVATION_STYLE,
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
                  // console.log(reader.result);
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
            });
        },
      });
      return new ImageLayer({
        id: observation.id,
        source,
      });
    }

    let layerStyle;
    if (isContext) {
      layerStyle = Constants.POLYGON_CONTEXT_STYLE;
    } else if (encodedShape.indexOf('LNESTRING') === 0 || encodedShape.indexOf('MULTILINESTRING') === 0) {
      layerStyle = Constants.LNE_OBSERVATION_STYLE;
    } else if (encodedShape.indexOf('POINT') === 0 || encodedShape.indexOf('MULTIPOINT') === 0) {
      layerStyle = Constants.POINT_OBSERVATION_STYLE;
    } else {
      layerStyle = Constants.POLYGON_OBSERVATION_STYLE;
    }

    const feature = new Feature({
      geometry,
      name: observation.label,
      id: observation.id,
    });

    return new LayerVector({
      id: observation.id,
      source: new SourceVector({
        features: [feature],
      }),
      style: layerStyle,
    });
  },

  * reverseKeys(arr) {
    let key = arr.length - 1;

    while (key >= 0) {
      yield key;
      key -= 1;
    }
  },

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
