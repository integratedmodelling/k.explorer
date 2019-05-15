/* eslint-disable object-curly-newline,prefer-destructuring,no-multi-spaces */
import Constants from 'shared/Constants';
import store from 'store/index';
import { MAP_CONSTANTS, MAP_STYLES } from 'shared/MapConstants';
import { getGradient, interpolateArray, createMarker } from 'shared/Utils';
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

const WKTInstance = new WKT();

/**
 * Helpers functions shared between components.
 * A plugin (helper.js) is called to link function to Vue instance ($helpers)
 * Same js file is used to expose Constants
 */

/**
 * Return true if observation is a raster. Made to centralize the control in this library, not exported
 * @param observation
 * @returns {boolean}
 */
export const isRasterObservation = (observation = null) => {
  if (observation === null) {
    return false;
  }
  const { geometryTypes } = observation;
  return geometryTypes && typeof geometryTypes.find(gt => gt === Constants.GEOMTYP_RASTER) !== 'undefined';
};


/**
 * Push an element in a queue with a max length (all history queue)
 * @param array array to push element
 * @param element element to push
 * @param maxLenght max array length (optional). If not indicated
 * Constants.HIST_MAX_LENGTH is used
 */
export const pushElementInFixedQueue = (array, element, maxLenght = Constants.HIST_MAX_LENGTH) => {
  array.push(element);
  if (array.length > maxLenght) {
    array.shift();
  }
};

/**
 * Return last element of log array filtered by type (or not)
 * @param log the log array
 * @param type one of Constants.TYPE_[DEBUG | INFO | WARNING | ERROR | ALL]
 * @returns last element of type or null if log is empry
 */
export const lastFilteredLogElement = (log, type) => {
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
};

/**
 * Search a node using a property
 * @param tree the tree where to look for node
 * @param key the node key value
 */
export const findNodeById = (tree, key = null) => {
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
};

/**
 * Return a node object from an observation
 * @param observation
 */
export const getNodeFromObservation = observation => ({
  node: {
    id: observation.id,
    label: observation.literalValue || observation.label,
    observable: observation.observable,
    type: observation.shapeType,
    viewerIdx: observation.viewerIdx,
    viewerType: observation.viewerIdx !== null ? store.getters['view/viewer'](observation.viewerIdx).type : null,
    children: [],
    tickable: observation.viewerIdx !== null && !observation.empty,
    disabled: observation.empty,
    notified: observation.notified || observation.previouslyNotified,
    empty: observation.empty, // disabled can change
    actions: observation.actions,
    header: 'default',
    folderId: observation.folderId,
    main: observation.main,
    exportFormats: observation.exportFormats,
    rootContextId: observation.rootContextId,
    observationType: observation.observationType,
  },
  parentId: observation.folderId === null ? observation.parentId : observation.folderId,
});

/**
 * If we need a new projection, a call to epsg.io is maded to retrieve
 * projection definition and register it.
 * For now, it live until browser close
 * TODO implement browser database support
 * @param projection
 * @returns {Promise}
 */
export const registerProjection = projection => new Promise((resolve, reject) => { // projection in format ESPG:XXXXX
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
              console.info(`New projection registered: ${newProjCode}`);
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


/**
 * Return the geometry of context.
 * Now getLayerObject only work with observation
 * @param contextObservation
 * @returns {<module:ol/geom/Geometry> || Array with 2 coordinates}
 */
export async function getContextGeometry(contextObservation) {
  let dataProjection;
  const { spatialProjection } = contextObservation;
  if (spatialProjection !== null) {
    dataProjection = getProjection(spatialProjection);
    if (dataProjection === null) { // unknows projection, need ask for it
      dataProjection = await registerProjection(spatialProjection);
    }
  } else {
    dataProjection = MAP_CONSTANTS.PROJ_EPSG_4326;
  }
  let { encodedShape } = contextObservation;
  // normalize encodedShape
  if (encodedShape.indexOf('LINEARRING') === 0) {
    encodedShape = encodedShape.replace('LINEARRING', 'LINESTRING');
  }
  let geometry = null;
  if (encodedShape.indexOf('POINT') !== -1) {
    const feature = WKTInstance.readFeature(encodedShape, {
      dataProjection,
      featureProjection: MAP_CONSTANTS.PROJ_EPSG_3857,
    });
    if (feature !== null && feature.getGeometry() !== null) {
      geometry = feature.getGeometry().getFirstCoordinate();
    }
  } else {
    geometry = WKTInstance.readGeometry(encodedShape, {
      dataProjection,
      featureProjection: MAP_CONSTANTS.PROJ_EPSG_3857,
    });
  }
  contextObservation.zIndexOffset = 0; // is context, remaind it
  return geometry;
}


/**
 * Useful to call a REST action
 * @param uid used for spinner
 * @param url url of REST action
 * @param params params for REST action
 * @param callback callback to call if 200 (expect to receive two params: response and callback to stop spinner)
 * @param errorCallback callback to call if error
 */
export const getAxiosContent = (uid, url, parameters, callback, errorCallback = null) => {
  store.dispatch('view/setSpinner', { ...Constants.SPINNER_LOADING, owner: uid }, { root: true });

  axiosInstance.get(url, parameters)
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
      if (errorCallback !== null) {
        errorCallback(error);
      } else {
        throw error;
      }
    });
};

/**
 * Build a layer object. If needed ask for projection (reason for async function)
 * @param observation the observations: needed for projection ad type of representation
 * @param isContext if is context, a lot of thing are not needed
 * @param viewport not used for now. If not setted, for now is the double of height/width of browser
 * @return layer
 */
export async function getLayerObject(observation, { viewport = null /* , projection = null */ }) {
  // const { geometryTypes } = observation;
  const isRaster = isRasterObservation(observation); // geometryTypes && typeof geometryTypes.find(gt => gt === Constants.GEOMTYP_RASTER) !== 'undefined';
  let spatialProjection;
  if (isRaster) {
    if (observation.parentId === store.getters['data/context'].id) {
      spatialProjection = store.getters['data/context'].spatialProjection;
    } else {
      const parent = findNodeById(store.state.data.tree, observation.parentId);
      if (parent !== null && parent.spatialProjection) {
        spatialProjection = parent.spatialProjection;
      } else {
        console.debug(`Unknown parent with id ${observation.parentId}`);
      }
    }
  } else {
    spatialProjection = observation.spatialProjection;
  }

  let dataProjection;
  if (spatialProjection !== null) {
    dataProjection = getProjection(spatialProjection);
    if (dataProjection === null) { // unknows projection, need ask for it
      dataProjection = await registerProjection(spatialProjection);
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
    featureProjection: isRaster ? dataProjection : MAP_CONSTANTS.PROJ_EPSG_3857,
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
      // projection: MAP_CONSTANTS.PROJ_EPSG_3857,
      projection: dataProjection,
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
                getAxiosContent(`cm_${observation.id}`, url, { params: { format: 'COLORMAP' } }, (colormapResponse, colormapCallback) => {
                  if (colormapResponse && colormapResponse.data) {
                    const colormap = colormapResponse.data;
                    if (colormap.type === 'RAMP' && colormap.colors.length > 1 && colormap.colors.length < 256) {
                      const cmcol = [];
                      const cmlab = [];
                      const cml = colormap.colors.length;
                      const steps = Math.floor(256 / cml);
                      const lastSteps = steps + (256 - cml * steps);
                      for (let i = 0; i < cml - 1; i++) {
                        const tmpCol = getGradient(colormap.colors[i], colormap.colors[i + 1], (i === cml - 2) ? lastSteps : steps);
                        const tmpLab = interpolateArray([parseFloat(colormap.labels[i]), parseFloat(colormap.labels[i + 1])], (i === cml - 2) ? lastSteps : steps, 4);
                        cmcol.push(...tmpCol);
                        cmlab.push(...tmpLab);
                      }
                      observation.colormap = {
                        colors: cmcol,
                        labels: cmlab,
                        type: 'MODRAMP',
                      };
                    } else {
                      observation.colormap = colormap;
                    }
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
    layerStyle = createMarker(MAP_STYLES.POINT_OBSERVATION_SVG_PARAM, observation.label);
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
}

/**
 * DEFAULT Viewer on start
 */
export const OBSERVATION_DEFAULT = {
  shapeType: 'POINT',
  encodedShape: 'POINT (40.299841 9.343971)',
  id: null,
  label: 'DEFAULT',
  parentId: -1,
  visible: true,
  spatialProjection: 'EPSG:4326',
  observationType: Constants.OBSTYP_INITIAL,
};

const Helpers = {
  isRasterObservation,
  pushElementInFixedQueue,
  lastFilteredLogElement,
  findNodeById,
  getNodeFromObservation,
  registerProjection,
  getContextGeometry,
  getAxiosContent,
  getLayerObject,
};

export { Constants, Helpers };
