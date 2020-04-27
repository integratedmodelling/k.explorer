/* eslint-disable object-curly-newline,prefer-destructuring,no-multi-spaces */
import { CONSTANTS, GEOMETRY_CONSTANTS, SPINNER_CONSTANTS } from 'shared/Constants';
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
import { OBSERVATION_CONSTANTS } from './Constants';

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
  return geometryTypes && typeof geometryTypes.find(gt => gt === GEOMETRY_CONSTANTS.TYPE_RASTER) !== 'undefined';
};


/**
 * Push an element in a queue with a max length (all history queue)
 * @param array array to push element
 * @param element element to push
 * @param maxLenght max array length (optional). If not indicated
 * Constants.HIST_MAX_LENGTH is used
 */
export const pushElementInFixedQueue = (array, element, maxLenght = CONSTANTS.HIST_MAX_LENGTH) => {
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

export const findNode = (tree, key = null, comparator) => {
  if (tree && key !== null && typeof comparator === 'function') {
    const { reduce } = [];
    const find = (result, node) => {
      if (result || !node) {
        return result;
      }
      if (Array.isArray(node)) {
        return reduce.call(Object(node), find, result);
      }
      const ret = comparator(node, key);
      if (ret === null && node.children && node.children.length > 0) {
        return find(null, node.children);
      }
      return ret;
    };
    return find(null, tree);
  }
  return null;
};

/**
 * Search a node using a property
 * @param tree the tree where to look for node
 * @param key the node key value
 */
export const findNodeById = (tree, key = null) => findNode(tree, key, (node, needle) => {
  if (node.id === needle) {
    return node;
  }
  return null;
});

/**
 * Return a node object from an observation
 * @param observation
 */
export const getNodeFromObservation = (observation) => {
  const hasContainer = observation.parentArtifactId !== null || (observation.parentId !== null && observation.rootContextId !== observation.parentId);
  const parentId = observation.parentArtifactId !== null ? observation.parentArtifactId :  observation.parentId;
  let userNode = observation.main;
  if (!userNode && hasContainer) {
    const parent = findNodeById(store.getters['data/tree'], parentId);
    if (parent !== null) {
      userNode = userNode || parent.userNode; // || parent.main;
    }
  }
  return {
    node: {
      id: observation.id,
      label: observation.literalValue || observation.label,
      observable: observation.observable,
      type: observation.shapeType,
      dynamic: false, // used if we receive some modification event
      viewerIdx: observation.viewerIdx,
      viewerType: observation.viewerIdx !== null ? store.getters['view/viewer'](observation.viewerIdx).type : null,
      loading: false,
      children: [],
      childrenCount: observation.childrenCount,
      childrenLoaded: 0,
      siblingsCount: observation.siblingsCount,
      parentArtifactId: observation.parentArtifactId,
      tickable: (observation.viewerIdx !== null && !observation.empty) || observation.isContainer || observation.childrenCount > 0,
      disabled: (observation.empty && (!observation.isContainer || observation.childrenCount === 0)) || observation.singleValue || observation.observationType === OBSERVATION_CONSTANTS.TYPE_PROCESS,
      empty: observation.empty, // disabled can change
      actions: observation.actions,
      header: observation.isContainer ? 'folder' : 'default',
      main: observation.main,
      userNode,
      isContainer: observation.isContainer,
      exportFormats: observation.exportFormats,
      rootContextId: observation.rootContextId,
      contextId: observation.contextId,
      observationType: observation.observationType,
      noTick: observation.singleValue || observation.observationType === OBSERVATION_CONSTANTS.TYPE_PROCESS,
      ...(observation.isContainer && { childrenLoaded: 0 }),
      ...(observation.siblingsCount && { siblingsCount: observation.siblingsCount }),
      parentId,
    },
    parentId,
  };
};

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
  if (contextObservation.id === contextObservation.rootContextId) {
    contextObservation.zIndexOffset = 0; // is context, remaind it
  }
  return geometry;
}

/**
 * Rewrite axios error as object with status, message and original
 * @param axiosError an error returned from axios catch
 * @return { status, message, axiosError: original error }
 */
export function getError(axiosError) {
  if (axiosError.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      status: axiosError.response.data.status || axiosError.response.status, // if blob we don't have a valid data object
      message: axiosError.response.data.message || axiosError.response.data || (axiosError.response.statusText !== '' ? axiosError.response.statusText : 'Unknown'),
      axiosError,
    };
  } if (axiosError.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {
      status: axiosError.request.status,
      message: axiosError.message,
      axiosError,
    };
  }
  return {
    status: 'UNKNOWN',
    message: axiosError.message,
    axiosError,
  };
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
  store.dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_LOADING, owner: uid }, { root: true });

  axiosInstance.get(url, parameters)
    .then((response) => {
      if (response) {
        callback(response, () => {
          store.dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: uid }, { root: true });
        });
      }
    })
    .catch((error) => {
      const errorObject = getError(error);
      let errorMessage = null;
      if (errorObject != null) {
        errorMessage = errorObject.message;
      }
      store.dispatch('view/setSpinner', {
        ...SPINNER_CONSTANTS.SPINNER_ERROR,
        owner: uid,
        errorMessage,
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
export async function getLayerObject(observation, { viewport = null, timestamp = -1 /* , projection = null */ }) {
  // const { geometryTypes } = observation;
  const isRaster = isRasterObservation(observation); // geometryTypes && typeof geometryTypes.find(gt => gt === Constants.GEOMTYP_RASTER) !== 'undefined';
  let spatialProjection;
  if (isRaster) {
    const context = store.getters['data/context'];
    if (observation.parentId === context.id) {
      spatialProjection = context.spatialProjection;
    } else {
      const parent = store.getters['data/observations'].find(o => o.id === observation.parentId);
      if (parent && parent.spatialProjection) {
        spatialProjection = parent.spatialProjection;
      } else {
        spatialProjection = context.spatialProjection;
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

  const id = `${observation.id}T${timestamp}`;

  // check if the layer is a raster
  if (isRaster) {
    // z-index offset = 0, raster is down
    observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_BASE * MAP_CONSTANTS.ZINDEX_MULTIPLIER_RASTER;
    observation.loaded = false;
    if (viewport === null) {
      viewport = Math.max(document.body.clientHeight, document.body.clientWidth) * GEOMETRY_CONSTANTS.PARAM_VIEWPORT_MULTIPLIER;
      // console.log(`Viewport: ${viewport} calculated using clientHeight: ${document.body.clientHeight} and clientwidth: ${document.body.clientWidth}`);
    } else if (viewport > GEOMETRY_CONSTANTS.PARAM_VIEWPORT_MAX_SIZE) {
      viewport = GEOMETRY_CONSTANTS.PARAM_VIEWPORT_MAX_SIZE;
    }
    const layerExtent = geometry.getExtent();
    const url = `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${observation.id}`;
    const source = new Static({
      projection: dataProjection,
      imageExtent: layerExtent,
      url,
      style: MAP_STYLES.POLYGON_OBSERVATION_STYLE,
      imageLoadFunction: (imageWrapper, src) => {
        store.dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_LOADING, owner: `${src}${timestamp}` }, { root: true });
        store.dispatch('data/setLoadingLayers', { loading: true, observation });
        axiosInstance.get(src, {
          params: {
            format: GEOMETRY_CONSTANTS.TYPE_RASTER,
            viewport,
            ...(timestamp !== -1 && { locator: `T1(1){time=${timestamp}}` }),
          },
          responseType: 'blob',
        })
          .then((response) => {
            if (response) {
              const reader = new FileReader();
              reader.readAsDataURL(response.data);
              reader.onload = () => {
                // console.timeEnd('loading image');
                const image = imageWrapper.getImage();
                image.src = reader.result;
                store.dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: `${src}${timestamp}` }, { root: true });
                observation.tsImages.push(`T${timestamp}`);
                observation.loaded = true;
                store.dispatch('data/setLoadingLayers', { loading: false, observation });
                // load colormap if necesary
                getAxiosContent(`cm_${observation.id}`, url, { params: { format: 'COLORMAP', ...(timestamp !== -1 && { locator: `T1(1){time=${timestamp}}` }) } }, (colormapResponse, colormapCallback) => {
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
                        // ...(timestamp !== -1 && { locator: `T1(1){time=${timestamp}}` }),
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
                  ...SPINNER_CONSTANTS.SPINNER_ERROR,
                  owner: `${src}${timestamp}`,
                  errorMessage: error,
                }, { root: true });
              };
            }
          })
          .catch((error) => {
            store.dispatch('view/setSpinner', {
              ...SPINNER_CONSTANTS.SPINNER_ERROR,
              owner: src,
              errorMessage: error,
            }, { root: true });
            // store.dispatch('data/setLoadingLayers', { loading: false, observationId: observation.id });
            throw error;
          });
      },
    });
    return new ImageLayer({
      id,
      source,
    });
  }

  let layerStyle;

  if (encodedShape.indexOf('LINESTRING') === 0 || encodedShape.indexOf('MULTILINESTRING') === 0) {
    layerStyle = MAP_STYLES.LNE_OBSERVATION_STYLE;
    observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_BASE * MAP_CONSTANTS.ZINDEX_MULTIPLIER_LINES;
  } else if (encodedShape.indexOf('POINT') === 0 || encodedShape.indexOf('MULTIPOINT') === 0) {
    layerStyle = createMarker(MAP_STYLES.POINT_OBSERVATION_SVG_PARAM, observation.label);
    observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_BASE * MAP_CONSTANTS.ZINDEX_MULTIPLIER_POINTS;
  } else {
    layerStyle = MAP_STYLES.POLYGON_OBSERVATION_STYLE;
    observation.zIndexOffset = MAP_CONSTANTS.ZINDEX_BASE * MAP_CONSTANTS.ZINDEX_MULTIPLIER_POLYGONS;
  }

  const feature = new Feature({
    geometry,
    name: observation.label,
    id,
  });

  const vectorLayer = new VectorLayer({
    id,
    source: new SourceVector({
      features: [feature],
    }),
    style: layerStyle,
  });

  return vectorLayer;
}

export const getStateIcon = (state) => {
  switch (state) {
    case 'FORTHCOMING':
      return { icon: 'mdi-airplane-landing', tooltip: 'forthcoming' };
    case 'EXPERIMENTAL':
      return { icon: 'mdi-flask-outline', tooltip: 'experimental' };
    case 'NEW':
      return { icon: 'mdi-new-box', tooltip: 'new' };
    case 'STABLE':
      return { icon: 'mdi-check-circle-outline', tooltip: 'stable' };
    case 'BETA':
      return { icon: 'mdi-radioactive', tooltip: 'beta' };
    default:
      return {};
  }
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
  getStateIcon,
  getError,
};

export { Helpers };
