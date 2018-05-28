import constants from './constants';

const helpers = {

  capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),

  pushElementInFixedQueue: (array, element) => {
    array.push(element);
    if (array.length > constants.HIST_MAX_LENGTH) {
      array.shift();
    }
  },

  formatExtent: (extent) => {
    if (extent) {
      return [extent.south.toFixed(2), extent.west.toFixed(2),
        extent.north.toFixed(2), extent.east.toFixed(2)];
    }
    return null;
  },

  toKlabExtent: (olExtent) => {
    const [south, west, north, east] = olExtent;
    return {
      south,
      west,
      north,
      east,
    };
  },

};

export { constants, helpers };
