import { colors } from 'quasar';
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
