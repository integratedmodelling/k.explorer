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

  getLayerShapeObject(observation) {
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
      source: new SourceVector({
        features: [feature],
      }),
      style: Constants.POLYGON_STYLE,
    });
  },

  /**
   * DEFAULT Viewer on start
   */
  VIEWER_DEFAULT: {
    main: true,
    type: Constants.VIEW_MAP,
    observations: [{
      shapeType: 'POINT',
      encodedShape: 'EPSG:4326 POLYGON ((-2.796 43.086, -4.946 43.086, -4.946 45.41, -3.796 45.41, -2.796 43.086))',
      id: null,
      label: 'DEFAULT',
      parentId: -1,
    }],
  },
};

export { Constants, Helpers };
