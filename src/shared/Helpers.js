import Constants from './Constants';

import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import WKT from 'ol/format/WKT';


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

  getContextShapeObject(context) {
    const { /* shapeType, is not needed because load from WKT */ encodedShape, spatialProjection } = context;

    const feature = new WKT().readFeature(encodedShape, {
      dataProjection: spatialProjection || Constants.DEFAULT_PROJ_DATA,
      featureProjection: Constants.DEFAULT_PROJ_VIEW,
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
    data: {
      id: 1,
      label: 'Default',
      lat: 43.332019,
      lng: -2.967827,
      zoom: 17,
    },
  },
};

export { Constants, Helpers };
