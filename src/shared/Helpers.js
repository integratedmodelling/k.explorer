import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import WKT from 'ol/format/WKT';
import Feature from 'ol/feature';
import Constants from 'shared/Constants';


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
  formatExtent: (extent) => {
    if (extent) {
      return [extent.south.toFixed(2), extent.west.toFixed(2),
        extent.north.toFixed(2), extent.east.toFixed(2)];
    }
    return null;
  },

  /**
   * Search the parent with the key
   * @param tree the tree where to look for parent
   * @param key the parent key
   */
  // eslint-disable-next-line consistent-return
  findParent(tree, key = null) {
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
      polyCoords.push(olProj.transform([parseFloat(pair[0]), parseFloat(pair[1])], dataProjection, Constants.DEFAULT_PROJ_VIEW));
    });
    return polyCoords;
  },
  */

  getLayerObject(observation, isContext = false) {
    const { /*  shapeType, */ encodedShape } = observation;
    const regexWKT = /(EPSG:\d{4})?\s?(.*)/g;
    const regexShape = regexWKT.exec(encodedShape);
    const dataProjection = regexShape[1] || Constants.PROJ_EPSG_4326;

    const geometry = new WKT().readGeometry(regexShape[2], {
      dataProjection,
      featureProjection: Constants.PROJ_EPSG_3857,
    });

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
