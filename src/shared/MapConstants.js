import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import XYZ from 'ol/source/XYZ';
import BingMaps from 'ol/source/BingMaps';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Icon from 'ol/style/Icon';
import * as control from 'ol/control';
import { transform } from 'ol/proj';


export const MAP_CONSTANTS = {
  BING_KEY: '', // TODO we need it?
  COORD_BC3: [-2.968226, 43.332125],

  PROJ_EPSG_4326: 'EPSG:4326',
  PROJ_EPSG_3857: 'EPSG:3857',

  ZINDEX_OFFSET: 10000,
  ZINDEX_MULTIPLIER_RASTER: 0,
  ZINDEX_MULTIPLIER_POLYGONS: 1,
  ZINDEX_MULTIPLIER_LINES: 2,
  ZINDEX_MULTIPLIER_POINTS: 3,

  DEFAULT_BASELAYER: 'mapbox_cali_terrain',
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
  POINT_OBSERVATION_SVG_ICON: style => new Icon({
    opacity: 1,
    src: `data:image/svg+xml;utf8,${MAP_ELEMENTS.MARKER_SVG(style)}`,
    scale: 0.3,
  }),
  POINT_OBSERVATION_TEXT: new Text({
    textAlign: 'center',
    textBaseline: 'bottom',
    offsetY: -20,
  }),
};

export const MAP_STYLES = {
  POLYGON_CONTEXT_STYLE: new Style({
    fill: new Fill({
      color: 'rgba(38, 166, 154, 0.2)',
    }),
  }),
  POLYGON_OBSERVATION_STYLE: new Style({
    /*
    stroke: new Stroke({
      // color: colors.getBrand('secondary'),
      color: 'rgb(255, 102, 0)',
      width: 1,
    }),
    */
    fill: new Fill({
      color: 'rgba(255, 102, 0, 0.4)',
    }),
  }),
  LNE_OBSERVATION_STYLE: new Style({
    stroke: new Stroke({
      color: 'rgb(255, 102, 0)',
      width: 2,
    }),
  }),
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
    title: 'Open Street Map',
    type: 'base',
    source: new OSM(),
    visible: false,
  }),

  STAMEN_WATER_COLOR_LAYER: new Tile({
    name: 'stamen_water_color_layer',
    title: 'Stamen Watercolor',
    type: 'base',
    source: new Stamen({
      layer: 'watercolor',
    }),
    visible: false,
  }),

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

  GOOGLE_HYBRID: new Tile({
    name: 'google_hybrid',
    title: 'Google Hybrid',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
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
      url: 'https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
      attribution: '© 2018 Google, Inc',
    }),
    visible: false,
  }),

  MAPBOX_CALI_TERRAIN: new Tile({
    name: 'mapbox_cali_terrain',
    title: 'k.LAB Mapbox Cali terrain',
    type: 'base',
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'https://api.mapbox.com/styles/v1/k-lab/cjkwh1z9z06ok2rrn9unfpn2n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiay1sYWIiLCJhIjoiY2prd2d2dWNxMHlvcDNxcDVsY3FncDBydiJ9.zMQE3gu-0qPpkLapVfVhnA',
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
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
  */

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
};

export const DEFAULT_OPTIONS = {
  controls: control.defaults({ attribution: false }).extend([]),
  layers: [
    Layers.EMPTY_LAYER,
    Layers.STAMEN_WATER_COLOR_LAYER,
    Layers.OSM_LAYER,
    Layers.OPEN_TOPO_MAT,
    // Layers.BING_IMAGINERY,
    Layers.GOOGLE_STREET,
    Layers.GOOGLE_HYBRID,
    Layers.GOOGLE_TERRAIN,
    Layers.MAPBOX_CALI_TERRAIN,
  ],
  target: 'map',
  projection: MAP_CONSTANTS.PROJ_EPSG_4326,
  center: transform(MAP_CONSTANTS.COORD_BC3, MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857),
  zoom: 13,
  /*
  tools: {
    mousePosition: true,
    scaleLine: true,
    overview: true,
    fullScreen: true,
    zoomslider: false,
    layerSwitcher: true
  },
  */
};