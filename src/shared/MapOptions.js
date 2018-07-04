import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import XYZ from 'ol/source/XYZ';
import BingMaps from 'ol/source/BingMaps';
import * as control from 'ol/control';
import * as proj from 'ol/proj';
import Constants from './Constants';


/**
 * Define different basemaps
 * @author Darkscript <thefirstdarkscript@gmail.com>
 * @author Enrico Girotto <enrico.girotto@gmail.com>
 * Modify from class to layer library
 */
export const Layers = {
  OSM_LAYER: new Tile({
    title: 'Open Street Map',
    baseLayer: true,
    source: new OSM(),
    // visible: false,
  }),

  STAMEN_WATER_COLOR_LAYER: new Tile({
    title: 'Stamen Watercolor',
    baseLayer: true,
    source: new Stamen({
      layer: 'watercolor',
    }),
    // visible: false,
  }),

  OPEN_TOPO_MAT: new Tile({
    title: 'Open Topo',
    baseLayer: true,
    source: new XYZ({
      url: '//{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap',
    }),
    // visible: false,
  }),

  GOOGLE_HYBRID: new Tile({
    title: 'Google Hybrid',
    baseLayer: true,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
      attribution: '© 2018 Google, Inc',
    }),
    // visible: false,
  }),

  GOOGLE_STREET: new Tile({
    title: 'Google Street',
    baseLayer: true,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '© 2018 Google, Inc',
    }),
    // visible: false,
  }),

  GOOGLE_TERRAIN: new Tile({
    title: 'Google Terrain',
    baseLayer: true,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
      attribution: '© 2018 Google, Inc',
    }),
    // visible: false,
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
    title: 'Bing Imagery',
    baseLayer: true,
    source: new BingMaps({
      crossOrigin: 'anonymous',
      maxZoom: 19,
      key: Constants.BING_KEY,
      imagerySet: 'AerialWithLabels',
      attribution: '© 2017 Bing, Inc',
    }),
    // visible: false,
  }),
};

export const DEFAULT_OPTIONS = {
  controls: control.defaults({ attribution: false }).extend([]),
  layers: [
    // Layers.STAMEN_WATER_COLOR_LAYER,
    // Layers.OSM_LAYER,
    // Layers.OPEN_TOPO_MAT,
    // Layers.BING_IMAGINERY,
    // Layers.GOOGLE_STREET,
    // Layers.GOOGLE_HYBRID,
    Layers.GOOGLE_TERRAIN,
  ],
  target: 'map',
  projection: Constants.PROJ_EPSG_4326,
  center: proj.transform(Constants.COORD_BC3, Constants.PROJ_EPSG_4326, Constants.PROJ_EPSG_3857),
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
