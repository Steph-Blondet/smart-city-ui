/* global L */
import Ember from 'ember';


const {
  Object: EmberObject,
  computed,
  observer,
  set,
  setProperties,
  get,
  getProperties,
} = Ember;


export default EmberObject.extend({
  records: null,

  map: null,

  defaultVisibility: false,

  isVisible: false,

  isEnabled: true,


  layer: computed(function() {
    throw new Error('-map-layer: The layer computed property needs to be overridden on the implementing class!');
  }),


  isVisibleObserver: observer('isVisible', function() {
    this.toggleLayer(get(this, 'isVisible'));
  }),


  isEnabledObserver: observer('isEnabled', function() {
    if (!get(this, 'isEnabled')) {
      set(this, 'isVisible', false);
    }
  }),


  updateTargetMap(map) {
    setProperties(this, {
      map,
      isVisible: get(this, 'defaultVisibility'),
    });

    this.toggleLayer(get(this, 'isVisible'));
  },


  toggleLayer(visible) {
    const {
      map,
      layer,
    } = getProperties(this, ['map', 'layer']);

    if (visible && !map.hasLayer(layer)) {
      map.addLayer(layer);
    }
    else if (!visible && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  },
});
