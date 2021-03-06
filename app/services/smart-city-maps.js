/* global L */
import Ember from 'ember';

import {
  StreetMapTiles,
  GreyScaleTiles,

  ExistingEvMarkers,
  GasStationMarkers,
  BusStopMarkers,

  ParkZones,
  SchoolZones,

  AgricultureZone,
  CommercialZone,
  DowntownZone,
  IndustrialZone,
  ParkingZone,
  PublicLandZone,
  ResidentialSingleZone,
  ResidentialMultiZone,

  GridCells,
} from 'smart-city-ui/mapping/layers';

const {
  Service,
  get,
  set,
  inject,
  computed,
} = Ember;


export default Service.extend({
  store: inject.service(),

  map: null,

  maxActiveDataPoints: 4,

  currentActiveDataPoints: 0,

  currentDataPoint: 0,

  defaultCoordinates: {
    lat: 42.27,
    lng: -83.74,
  },

  defaultZoom: 13,

  accessToken: 'pk.eyJ1IjoiYmR1bGFuIiwiYSI6ImNpemZzOTYyYTAwbncycW5ueWYyaHkyeTkifQ.Iotxd_KBWcont6Hggmal1g',


  tileLayerKeys: computed(function() {
    return ['streetMapTiles', 'greyScaleTiles'];
  }),


  markerLayerKeys: computed(function() {
    return ['existingEvMarkers', 'gasStationMarkers', 'busStopMarkers'];
  }),


  polygonLayerKeys: computed(function() {
    return ['agricultureZone', 'commercialZone', 'downtownZone', 'industrialZone',
      'parkingZone', 'publicLandZone', 'residentialSingleZone', 'residentialMultiZone',
      'gridCells', 'parkZones', 'schoolZones'];
  }),


  layerKeys: computed.uniq('tileLayerKeys', 'markerLayerKeys', 'polygonLayerKeys'),


  streetMapTiles: computed(function() {
    const accessToken = get(this, 'accessToken');
    return StreetMapTiles.create({ accessToken });
  }).readOnly(),


  greyScaleTiles: computed(function() {
    const accessToken = get(this, 'accessToken');
    return GreyScaleTiles.create({ accessToken });
  }).readOnly(),


  existingEvMarkers: computed(function() {
    const records = get(this, 'store').peekAll('existing-charging-station');
    return ExistingEvMarkers.create({ records });
  }).readOnly(),


  gasStationMarkers: computed(function() {
    const records = get(this, 'store').peekAll('gas-station-location');
    return GasStationMarkers.create({ records });
  }).readOnly(),


  busStopMarkers: computed(function() {
    const records = get(this, 'store').peekAll('bus-stop');
    return BusStopMarkers.create({ records });
  }).readOnly(),


  parkZones: computed(function() {
    const records = get(this, 'store').peekAll('park');
    return ParkZones.create({ records });
  }).readOnly(),


  schoolZones: computed(function() {
    const records = get(this, 'store').peekAll('school');
    return SchoolZones.create({ records });
  }).readOnly(),


  agricultureZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isAgricultureZone');
    return AgricultureZone.create({ records });
  }).readOnly(),


  commercialZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isCommercialZone');
    return CommercialZone.create({ records });
  }).readOnly(),


  downtownZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isDowntownZone');
    return DowntownZone.create({ records });
  }).readOnly(),


  industrialZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isIndustrialZone');
    return IndustrialZone.create({ records });
  }).readOnly(),


  parkingZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isParkingZone');
    return ParkingZone.create({ records });
  }).readOnly(),


  publicLandZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isPublicLandZone');
    return PublicLandZone.create({ records });
  }).readOnly(),


  residentialSingleZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isResidentialSingleZone');
    return ResidentialSingleZone.create({ records });
  }).readOnly(),


  residentialMultiZone: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isResidentialMultiZone');
    return ResidentialMultiZone.create({ records });
  }).readOnly(),


  gridCells: computed(function() {
    const records = get(this, 'store').peekAll('grid-cell');
    return GridCells.create({ records });
  }).readOnly(),


  updateTargetMap(map, baseMapName = 'streetMapTiles') {
    set(this, 'map', map);

    L.control.scale().addTo(map);

    const layerKeys = get(this, 'layerKeys');

    for (let i = 0; i < layerKeys.length; i += 1) {
      get(this, layerKeys[i]).updateTargetMap(map);
    }

    this.setBaseMap(baseMapName);

    return this;
  },


  setCenter(coordindates) {
    const map = get(this, 'map');

    if (map) {
      map.panTo(coordindates || get(this, 'defaultCoordinates'));
    }

    return this;
  },


  setZoom(zoom) {
    const map = get(this, 'map');

    if (map) {
      map.setZoom(zoom || get(this, 'defaultZoom'));
    }

    return this;
  },


  setBaseMap(name) {
    const tileLayers = get(this, 'tileLayerKeys');

    for (let i = 0; i < get(tileLayers, 'length'); i += 1) {
      set(this, `${tileLayers[i]}.isVisible`, tileLayers[i] === name);
    }

    return this;
  },
});
