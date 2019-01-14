import { colors } from 'quasar';

/**
 * RegExp to detect a color string as rgba(...)
 * @type {RegExp}
 */
const reRGBA = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
/**
 * Get color utility function from quasar
 */
const { hexToRgb, getBrand, rgbToHex } = colors;
/**
 * Utilities used in Helpers. Function with general application
 * @type {{capitalizeFirstLetter: (function(*): string), formatExtent: (function(*=))}}
 */

/**
 * Capitalize first letter of string
 * @param str the string to capitalize
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Utility method to print coordinates with only 2 decimals
 * TODO: probably not needed
 * @param extent
 * @returns {*}
 */
export function formatExtent(localExtent) {
  if (localExtent) {
    return [localExtent.south.toFixed(2), localExtent.west.toFixed(2),
      localExtent.north.toFixed(2), localExtent.east.toFixed(2)];
  }
  return null;
}

/**
 * Transform a color text that will be #(XX)XXXXXX or rgb(a)(xxx, xxx, xxx(, x.x))
 * @param color
 * @returns {r:xxx, g:xxx, b:xxx}
 */
export function textToRgb(color) {
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
}

/**
 * Receive an hex value (#), rgb (rgb()) or brand ('primary')
 * Return the correspondent rgb and hex value
 * @param color an hex value (#), rgb (rgb()) or brand ('primary')
 * @returns {{rgb: *, hex: *, color: *}}
 */
export function getColorObject(color) {
  let rgb;
  let hex;
  if (color.indexOf('#') === 0) {
    hex = color;
    rgb = hexToRgb(color);
  } else if (color.indexOf(',') !== -1) {
    rgb = textToRgb(color);
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
}

/**
 * Return the gradient in rgb object from first color to last color in steps steps
 * @param first
 * @param last
 * @param steps
 * @see https://graphicdesign.stackexchange.com/questions/83866/generating-a-series-of-colors-between-two-colors
 * @returns {Array}
 */
export function getGradient(first, last, steps) {
  if (first === null || last === null || steps < 1) {
    console.warn(`Bad colors: ${first}, ${last}`);
  }
  const c1 = getColorObject(first).rgb;
  const c2 = getColorObject(last).rgb;
  const stepFactor = 1 / (steps - 1);
  const colorList = [];
  let r;
  let g;
  let b;
  for (let i = 0; i < steps; i++) {
    r = c1.r + Math.round(stepFactor * i * (c2.r - c1.r));
    g = c1.g + Math.round(stepFactor * i * (c2.g - c1.g));
    b = c1.b + Math.round(stepFactor * i * (c2.b - c1.b));
    colorList.push(`rgb(${r},${g},${b})`);
  }
  return colorList;
}

/**
 * Transform an array in other with finalDimension calculating the linear interpolation
 * @param array
 * @param finalDimension
 * @param decimals
 * @returns {Array}
 */
export function interpolateArray(array, finalDimension, decimals = null) {
  const linearInterpolate = (before, after, atPoint) => before + (after - before) * atPoint;

  const newData = [];
  const springFactor = Number((array.length - 1) / (finalDimension - 1));
  [newData[0]] = array; // for new allocation
  for (let i = 1; i < finalDimension - 1; i++) {
    const tmp = i * springFactor;
    const before = Number(Math.floor(tmp)).toFixed();
    const after = Number(Math.ceil(tmp)).toFixed();
    const atPoint = tmp - before;
    const interpolated = linearInterpolate(array[before], array[after], atPoint);
    if (decimals !== null) {
      newData[i] = interpolated.toFixed(decimals);
    } else {
      newData[i] = interpolated;
    }
  }
  newData[finalDimension - 1] = array[array.length - 1]; // for new allocation
  return newData;
}

/**
 * Filter an array to remove duplicates
 * @param array
 */
export function uniqueArray(array) {
  return array.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
}

/**
 * Return white or black if brightnes > 123 (Ref: https://trendct.org/2016/01/22/how-to-choose-a-label-color-to-contrast-with-background/)
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */
export function getBrightnessColor(r, g, b) {
  return ((r * 299 + g * 587 + b * 114) / 1000 >= 123 ? '#000' : '#fff');
}

/**
 * Copy text to clipboard
 * Code from Angelos Chalaris @see https://hackernoon.com/@chalarangelo
 * @param str string to copy
 */
export function copyToClipboard(str) {
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
}

export default {
  capitalizeFirstLetter,
  formatExtent,
  textToRgb,
  getColorObject,
  getGradient,
  interpolateArray,
  uniqueArray,
  getBrightnessColor,
  copyToClipboard,
};
