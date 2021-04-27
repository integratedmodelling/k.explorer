import { COLORS } from 'shared/Constants';
import Tile from 'ol/layer/Tile';
import ArcGISRest from 'ol/source/TileArcGISRest';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Icon from 'ol/style/Icon';
import StrokePattern from 'ol-ext/style/StrokePattern';
import Feature from 'ol/Feature';
import Mask from 'ol-ext/filter/Mask';
import * as control from 'ol/control';
import { transform, get as getProjection } from 'ol/proj';
// import Stamen from 'ol/source/Stamen';
// import BingMaps from 'ol/source/BingMaps';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoiay1sYWIiLCJhIjoiY2prd2d2dWNxMHlvcDNxcDVsY3FncDBydiJ9.zMQE3gu-0qPpkLapVfVhnA';
const MAPBOX_ATTRIBUTIONS = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';

export const MAP_CONSTANTS = {
  BING_KEY: '', // TODO we need it?
  COORD_BC3: [-2.968226, 43.332125],

  PROJ_EPSG_4326: getProjection('EPSG:4326'),
  PROJ_EPSG_3857: getProjection('EPSG:3857'),

  ZINDEX_TOP: 10000,
  ZINDEX_BASE: 1000,
  ZINDEX_MULTIPLIER_RASTER: 0,
  ZINDEX_MULTIPLIER_POLYGONS: 1,
  ZINDEX_MULTIPLIER_LINES: 2,
  ZINDEX_MULTIPLIER_POINTS: 3,

  DEFAULT_BASELAYER: 'osm_layer',
};

export const MAP_ELEMENTS = {
  MARKER_SVG: ({ fill = 'yellow', stroke = 'black', strokeWidth = '5' }) => `<svg width="80" height="80" version="1.1" xmlns="http://www.w3.org/2000/svg"
  viewBox="0 -${strokeWidth} 80 ${(strokeWidth * 2) + 80}">
  <path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" d="M40,0C26.191,0,15,11.194,15,25c0,23.87,25,55,25,55s25-31.13,25-55C65,11.194,53.807,0,40,0z
  M40,38.8c-7.457,0-13.5-6.044-13.5-13.5S32.543,11.8,40,11.8c7.455,0,13.5,6.044,13.5,13.5S47.455,38.8,40,38.8z"/></svg>`,
  /*
    `<?xml version="1.0" encoding="iso-8859-1"?>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="40" height="40" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
  <g>
    <path style="fill:${fill};" d="M19.999,38.251C17.896,35.874,7.5,23.628,7.5,14C7.5,7.107,13.107,1.5,20,1.5S32.5,7.107,32.5,14   C32.5,23.58,22.102,35.866,19.999,38.251z"/>
    <g>
      <path style="fill:${stroke};" d="M20,2c6.617,0,12,5.383,12,12c0,8.932-9.29,20.349-12.001,23.491C17.286,34.358,8,22.977,8,14    C8,7.383,13.383,2,20,2 M20,1C12.82,1,7,6.82,7,14c0,10.981,13,25,13,25s13-14.074,13-25C33,6.82,27.18,1,20,1L20,1z"/>
    </g>
  </g>
  <g>
    <circle fill-opacity="0" cx="20" cy="14" r="5.5"/>
    <g>
      <path style="fill:${stroke};" d="M20,9c2.761,0,5,2.239,5,5s-2.239,5-5,5s-5-2.239-5-5S17.239,9,20,9 M20,8c-3.308,0-6,2.692-6,6    s2.692,6,6,6s6-2.692,6-6S23.308,8,20,8L20,8z"/>
    </g>
  </g>
  </svg>`,
  */

};

export const MAP_STYLE_ELEMENTS = {
  POINT_OBSERVATION_ICON: new Icon({
    anchor: [0.5, 1],
    src: 'statics/maps/marker.png',
    opacity: 0.8,
    scale: 0.6,
  }),
  POINT_OBSERVATION_SVG_ICON: (style, scale = 0.3) => new Icon({
    opacity: 1,
    src: `data:image/svg+xml;utf8,${MAP_ELEMENTS.MARKER_SVG(style)}`,
    scale,
  }),
  POINT_OBSERVATION_TEXT: ({ offsetY = 25, bold = false, size = '10px' } = {}) => new Text({
    textAlign: 'center',
    textBaseline: 'bottom',
    offsetY,
    font: `${(bold) ? 'bold' : 'normal'} ${size} Roboto, sans-serif`,
  }),
};

export const MAP_STYLES = {
  POLYGON_CONTEXT_STYLE: new Style({
    fill: new Fill({
      color: 'rgba(38, 166, 154, 0.2)',
    }),
  }),
  POLYGON_PROPOSED_CONTEXT: new Style({
    // default OL style
    fill: new Fill({
      color: 'rgba(255,255,255,0.5)',
    }),
    stroke: new StrokePattern({
      width: 8,
      pattern: 'hatch',
      color: '#3187ca',
      offset: 0,
      scale: 0.75,
      fill: new Fill({ color: '#FFFFFF' }),
      size: 2,
      spacing: 5,
      angle: 45,
    }),
    /*
    stroke: new Stroke({
      color: '#3399CC',
      width: 2,
      lineDash: [8, 5, 2, 5],
    }),
     */
  }),
  POLYGON_OBSERVATION_STYLE: new Style({
    stroke: new Stroke({
      // color: colors.getBrand('secondary'),
      color: 'rgb(255, 102, 0)',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255, 102, 0, 0.2)',
    }),
  }),
  LNE_OBSERVATION_STYLE: new Style({
    stroke: new Stroke({
      color: 'rgb(255, 102, 0)',
      width: 2,
    }),
  }),
  // { fill, stroke, strokeWidth, scale = 0.3 }
  POINT_OBSERVATION_SVG_PARAM: {
    fill: COLORS.MAIN_COLOR, // 'rgb(238,238,238)',
    stroke: 'rgb(51,51,51)',
    strokeWidth: '4',
    scale: 0.3,
  },
  POINT_CONTEXT_SVG_PARAM: {
    fill: 'rgb(17, 170, 187)',
    stroke: 'rgb(51,51,51)',
    strokeWidth: '5',
    scale: 0.5,
    offsetY: 35,
    bold: true,
    size: '14px',
  },
};

/**
 * Define different basemaps
 * @author Darkscript <thefirstdarkscript@gmail.com>
 * @author Enrico Girotto <enrico.girotto@gmail.com>
 * Modify from class to layer library
 */
export const Layers = {
  OSM_LAYER: new Tile({
    name: 'osm_layer',
    title: 'OpenStreetMap',
    type: 'base',
    source: new OSM({
      attributions: `Map credits &#169;
        <a href="https://www.openstreetmap.org/copyright" title="Open Street Maps">OSM</a>
      contributors.`,
    }),
    visible: false,
  }),
  ARCGIS_LAYER: new Tile({
    name: 'arcgis_layer',
    title: 'UN Clear Map',
    type: 'base',
    source: new ArcGISRest({
      url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_WebTopo/MapServer/export',
    }),
    visible: false,
  }),
  /*
  // Not professional
  STAMEN_WATER_COLOR_LAYER: new Tile({
    name: 'stamen_water_color_layer',
    title: 'Stamen Watercolor',
    type: 'base',
    source: new Stamen({
      layer: 'watercolor',
    }),
    visible: false,
  }),

  /* Stop working (detected on 2019/01/07
  OPEN_TOPO_MAT: new Tile({
    name: 'open_topo_mat',
    title: 'Open Topo',
    type: 'base',
    source: new XYZ({
      url: '//{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap',
    }),
    visible: false,
  }),
  */

  GOOGLE_HYBRID: new Tile({
    name: 'google_hybrid',
    title: 'Google Hybrid',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'http://mt{0-3}.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
      attribution: '© 2018 Google, Inc',
    }),
    visible: false,
  }),

  GOOGLE_STREET: new Tile({
    name: 'google_street',
    title: 'Google Street',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '© 2018 Google, Inc',
    }),
    visible: false,
  }),

  GOOGLE_TERRAIN: new Tile({
    name: 'google_terrain',
    title: 'Google Terrain',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'https://mt{0-3}.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
      attribution: '© 2018 Google, Inc',
    }),
    visible: false,
  }),

  MAPBOX_CALI_TERRAIN: new Tile({
    name: 'mapbox_cali_terrain',
    title: 'Mapbox Terrain',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: `https://api.mapbox.com/styles/v1/k-lab/cjkwh1z9z06ok2rrn9unfpn2n/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
      attribution: MAPBOX_ATTRIBUTIONS,
    }),
    visible: false,
  }),

  MAPBOX_MINIMO: new Tile({
    name: 'mapbox_minimo',
    title: 'Mapbox Minimo',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: `https://api.mapbox.com/styles/v1/k-lab/cjm0l6i4g7ffj2sqk7xy5dv1m/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
      attribution: MAPBOX_ATTRIBUTIONS,
    }),
    visible: false,
  }),
  MAPBOX_GOT: new Tile({
    name: 'mapbox_got',
    title: 'k.LAB Mapbox GOT',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: `https://api.mapbox.com/styles/v1/k-lab/cjuihteg13toh1fmovvd6r80y/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
      attribution: MAPBOX_ATTRIBUTIONS,
    }),
    visible: false,
  }),

  EMPTY_LAYER: new Tile({
    name: 'empty_layer',
    title: 'No background',
    type: 'base',
    visible: false,
  }),

  /* NOT FREE
  DIGITAL_GLOBE_IMAGINERY: new Tile({
    title: 'DigitalGlobe Imagery',
    baseLayer: true,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'http://api.tiles.mapbox.com/v4/digitalglobe.nal0mpda/{z}/{x}/{y}.png?access_token=' + Constants.DG_KEY,
      attribution: '© DigitalGlobe, Inc'
    }),
    visible: true
  }),

  DIGITAL_GLOBE_TERRAIN: new Tile({
    title: 'DigitalGlobe Terrain',
    baseLayer: true,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'http://api.tiles.mapbox.com/v4/digitalglobe.nako1fhg/{z}/{x}/{y}.png?access_token=' + Constants.DG_KEY,
      attribution: '© DigitalGlobe, Inc'
    }),
    visible: false
  }),


  BING_IMAGINERY: new Tile({
    name: 'bing_imaginery',
    title: 'Bing Imagery',
    type: 'base',
    source: new BingMaps({
      crossOrigin: 'anonymous',
      maxZoom: 19,
      key: MAP_CONSTANTS.BING_KEY,
      imagerySet: 'AerialWithLabels',
      attribution: '© 2017 Bing, Inc',
    }),
    visible: false,
  }),
  */
};

export const DEFAULT_OPTIONS = {
  controls: control.defaults({ attribution: false }).extend([]),
  target: 'map',
  projection: MAP_CONSTANTS.PROJ_EPSG_4326,
  center: transform(MAP_CONSTANTS.COORD_BC3, MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857),
  zoom: 13,
};

export const BASE_LAYERS = {
  layers: [
    Layers.EMPTY_LAYER,
    // Layers.STAMEN_WATER_COLOR_LAYER,
    // Layers.OPEN_TOPO_MAT,
    // Layers.BING_IMAGINERY,
    // Layers.GOOGLE_STREET,
    // Layers.GOOGLE_HYBRID,
    // Layers.GOOGLE_TERRAIN,
    Layers.MAPBOX_MINIMO,
    // Layers.ARCGIS_LAYER,
    Layers.OSM_LAYER,
    // Layers.MAPBOX_CALI_TERRAIN,
    // Layers.MAPBOX_GOT, // Game of throne joke
  ],
  mask: null,
  hasMask() {
    return this.mask !== null;
  },
  getBaseLayer() {
    return this.layers.find(layer => layer.get('type') === 'base' && layer.getVisible());
  },
  setMask(geometry, color = [38, 38, 38, 0.4]) {
    if (this.mask !== null) {
      this.removeMask();
    }
    this.mask = new Mask({
      feature: new Feature({ geometry, name: 'Context' }),
      inner: false,
      active: true,
      fill: new Fill({ color }),
    });
    this.layers.forEach((layer) => {
      layer.addFilter(this.mask);
    });
  },
  removeMask() {
    if (this.mask !== null) {
      this.layers.forEach((layer) => {
        layer.removeFilter(this.mask);
      });
    }
    this.mask = null;
  },
};
