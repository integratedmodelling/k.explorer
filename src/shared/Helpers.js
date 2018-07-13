import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import WKT from 'ol/format/WKT';
import Feature from 'ol/Feature';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import * as proj from 'ol/proj';
import { axiosInstance } from 'plugins/axios';
import Constants from 'shared/Constants';
import store from 'store/index';
// import * as extent from 'ol/extent';


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
  // eslint-disable-next-line consistent-return
  findNodeById(tree, key = null) {
    if (tree && key !== null) {
      // eslint-disable-next-line prefer-destructuring
      const reduce = [].reduce;
      // eslint-disable-next-line consistent-return
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
      };
      return find(null, tree);
    }
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

  getLayerObject(observation, { isContext = false /* , projection = null */ }) {
    const { geometryTypes, encodedShape } = observation;
    const regexWKT = /(EPSG:\d{4})?\s?(.*)/g;
    const regexShape = regexWKT.exec(encodedShape);
    const dataProjection = regexShape[1] || Constants.PROJ_EPSG_4326;

    const geometry = new WKT().readGeometry(regexShape[2], {
      dataProjection,
      featureProjection: Constants.PROJ_EPSG_3857,
    });

    // check if the layer is a raster
    if (geometryTypes && typeof geometryTypes.find(gt => gt === Constants.GEOMTYP_RASTER) !== 'undefined') {
      const layerExtent = geometry.getExtent();
      const url = `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${observation.id}`;
      // const url = 'http://localhost:8080/statics/klab-logo.png';
      const source = new Static({
        projection: proj.get('EPSG:3857'),
        imageExtent: layerExtent,
        // imageSize: [800, 800], // extent.getSize(layerExtent),
        url,
        style: Constants.POLYGON_OBSERVATION_STYLE,
        imageLoadFunction: (imageWrapper, src) => {
          store.dispatch('view/setSpinner', Constants.SPINNER_LOADING, { root: true });
          axiosInstance.get(src, {
            params: {
              format: Constants.GEOMTYP_RASTER,
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
                  store.dispatch('view/setSpinner', {
                    ...Constants.SPINNER_STOPPED,
                    errorMessage: 'TEST ERROR',
                  }, { root: true });
                  // console.log(reader.result);
                };
                reader.onerror = (error) => {
                  console.log('Error: ', error);
                };
              }
            })
            .catch((error) => {
              console.error(`Error loading image: ${error}`);
              store.dispatch('view/setSpinner', Constants.SPINNER_ERROR, { root: true });
            });
        },
      });
      return new ImageLayer({
        id: observation.id,
        source,
      });
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
      style: isContext ?
        Constants.POLYGON_CONTEXT_STYLE :
        Constants.POLYGON_OBSERVATION_STYLE,
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
    encodedShape: 'EPSG:4326 POINT (40.299841 9.343971)',
    id: null,
    label: 'DEFAULT',
    parentId: -1,
    visible: true,
  },
};

export { Constants, Helpers };
