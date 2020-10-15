import * as colors from 'shared/colors';
import { geom as jstsGeom, operation as jstsOperation, io as jstsIo } from 'jsts';
import { transform } from 'ol/proj';
import { fromCircle } from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import { MAP_CONSTANTS, MAP_STYLE_ELEMENTS } from 'shared/MapConstants';
import { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, Circle } from 'ol/geom';
import LinearRing from 'ol/geom/LinearRing';

/**
 * RegExp to detect a color string as rgba(...)
 * @type {RegExp}
 */
const reRGBA = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
// const reCSS_COLOR = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/;
/**
 * Get color utility function from quasar
 */
const { hexToRgb, getBrand, rgbToHex } = colors;

/**
 * The vertices must be om EPSG:3857 because open layer use it to draw
 */
const IDL = {
  topLeft: transform([-180, 90], MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857),
  bottomLeft: transform([-180, -90], MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857),
  topRight: transform([180, 90], MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857),
  bottomRight: transform([180, -90], MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857),

};
const JSTS_FACTORY = new jstsGeom.GeometryFactory();
/**
 * The IDL, from east or west
 * @type {{left: *, right: *}}
 */
const JSTS_IDLS = {
  left: JSTS_FACTORY.createLineString([new jstsGeom.Coordinate(IDL.topLeft[0], IDL.topLeft[1]), new jstsGeom.Coordinate(IDL.bottomLeft[0], IDL.bottomLeft[1])]),
  right: JSTS_FACTORY.createLineString([new jstsGeom.Coordinate(IDL.topRight[0], IDL.topRight[1]), new jstsGeom.Coordinate(IDL.bottomRight[0], IDL.bottomRight[1])]),
};
/**
 * The entire worlk, is used to check if there are somy polygons that goes out
 */
const JSTS_ALL_WORLD = JSTS_FACTORY.createPolygon([
  new jstsGeom.Coordinate(IDL.topLeft[0], IDL.topLeft[1]), new jstsGeom.Coordinate(IDL.topRight[0], IDL.topRight[1]),
  new jstsGeom.Coordinate(IDL.bottomRight[0], IDL.bottomRight[1]), new jstsGeom.Coordinate(IDL.bottomLeft[0], IDL.bottomLeft[1]),
  new jstsGeom.Coordinate(IDL.topLeft[0], IDL.topLeft[1]),
]);

/**
 * Utilities used in Helpers. Function with general application
 * @type {{capitalizeFirstLetter: (function(*): string), formatExtent: (function(*=))}}
 */

/**
 * Capitalize first letter of string
 * @param str the string to capitalize
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

export function isUpperCase(character) {
  if (!Number.isNaN(character * 1)) {
    return false; // is number
  }
  return character === character.toUpperCase();
}
/**
 * Return the hex from a html color name. TODO: Will be checked
 */
export function colourNameToHex(colour) {
  const colours = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
  };

  if (typeof colours[colour.toLowerCase()] !== 'undefined') {
    return colours[colour.toLowerCase()];
  }
  return null;
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
    if (hex === null) {
      hex = colourNameToHex(color);
      if (hex === null) {
        throw new Error(`Unknown color: ${color}`);
      }
    }
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

/**
 * JSTS centralized method to use only one instance for all app
 */
const jstsParser = new jstsIo.OL3Parser();
jstsParser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);

export { jstsParser };

export const jstsParseGeometry = (geometry) => {
  if (geometry instanceof Circle) {
    geometry = fromCircle(geometry);
  }
  return jstsParser.read(geometry);
};

/**
 * Check if a polygon cross IDL
 * @param polygon polygon
 * @returns {Array} an array with which IDL the polygon cross. If empty, no IDL crossing
 */
export function checkIDL(polygon) {
  const idl = [];
  // check if polygon cross IDL and where
  if (polygon.crosses(JSTS_IDLS.left)) {
    idl.push(JSTS_IDLS.left);
  }
  if (polygon.crosses(JSTS_IDLS.right)) {
    idl.push(JSTS_IDLS.right);
  }
  return idl;
}

/**
 * Return a polygon with IDL crossing issue solved if necessary
 * @param originalPolygon the original polygon
 * @returns {*} if the IDL is not crossed, it return the original polygon, else it return
 */
export function createIDLPolygon(originalPolygon) {
  const idl = checkIDL(originalPolygon);
  if (idl.length === 0) {
    // luck! nothing to do
    return originalPolygon;
  }
  // generate a multyline with the IDL...
  let united = originalPolygon.getExteriorRing();
  idl.forEach((line) => {
    united = united.union(line);
  });

  // generate polygons
  const polygonizer = new jstsOperation.polygonize.Polygonizer();
  polygonizer.add(united);
  const polygons = polygonizer.getPolygons();

  let result = null;
  for (let i = polygons.iterator(); i.hasNext();) {
    let polygon = i.next();
    // if the polygon is not contained, we need to change all its vertices
    // all this is done thinking in open layer with a flat earth, TODO: check if it work!
    if (!JSTS_ALL_WORLD.contains(polygon)) {
      const newVertices = [];
      const vertices = polygon.getCoordinates();
      const vxl = vertices.length;
      for (let j = 0; j < vxl; j++) {
        const vx = vertices[j];
        const factor = Math.round(Math.abs(vx.x / (IDL.topRight[0] * 2))) * 2;
        const x = vx.x + (vx.x < 0 ? IDL.topRight[0] : IDL.topLeft[0]) * factor;
        newVertices.push(new jstsGeom.Coordinate(x, vx.y));
      }
      polygon = JSTS_FACTORY.createPolygon(newVertices);
    }
    if (result === null) {
      result = polygon;
    } else {
      result = result.union(polygon);
    }
  }
  return result;
}

export function createMarker(svgParam, label) {
  const { fill, stroke, strokeWidth, scale, offsetY, bold, size } = svgParam;
  const image = MAP_STYLE_ELEMENTS.POINT_OBSERVATION_SVG_ICON({ fill, stroke, strokeWidth }, scale).clone();
  const text = MAP_STYLE_ELEMENTS.POINT_OBSERVATION_TEXT({ offsetY, bold, size }).clone();
  text.setText(label);
  return new Style({
    image,
    text,
  });
}

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
export function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
  // compatibility for firefox and chrome
  const MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  const pc = new MyPeerConnection({
    iceServers: [],
  });
  const noop = () => {};
  const localIPs = {};
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  // create a bogus data channel
  pc.createDataChannel('');

  // create offer and set local description
  pc.createOffer((sdp) => {
    sdp.sdp.split('\n').forEach((line) => {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });

    pc.setLocalDescription(sdp, noop, noop);
  }, noop);

  // listen for candidate events
  pc.onicecandidate = (ice) => {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
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
  jstsParser,
  jstsParseGeometry,
  checkIDL,
  createMarker,
  getUserIP,
};
