import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  computed,
  get,
  set,
  typeOf,
} = Ember;


export default Component.extend({
  classNames: ['topbar'],

  dataConductor: null,

  isPlayDisabled: computed.or('dataConductor.{isPlaying,aggregateActive}'),

  isPauseDisabled: computed.or('dataConductor.{isPaused,aggregateActive}'),

  isTimeRangeDisabled: computed.and('dataConductor.{isPlaying,sweepActive}'),


  evPercentageInFleetInt: computed('dataConductor.evPercentageInFleet', {
    get() {
      return get(this, 'dataConductor.evPercentageInFleet');
    },

    set(key, value) {
      value = typeOf(value) === 'string' ? parseInt(value) : value;

      set(this, 'dataConductor.evPercentageInFleet', value);
      return value;
    },
  }),


  chargeRemainingInt: computed('dataConductor.chargeRemaining', {
    get() {
      return get(this, 'dataConductor.chargeRemaining');
    },

    set(key, value) {
      value = typeOf(value) === 'string' ? parseInt(value) : value;

      set(this, 'dataConductor.chargeRemaining', value);
      return value;
    },
  }),


  formattedTimeRange: computed('dataConductor.timeRange.@each', function() {
    const range = get(this, 'dataConductor.timeRange');
    const start = moment('00:00', 'hh:mm').add(range[0] * 5, 'm').format('hh:mma');
    const end = moment('00:00', 'hh:mm').add(range[1] * 5, 'm').format('hh:mma');

    return { start, end };
  }),


  actions: {
    onDemandOrEmissionsToggle(isDemand) {
      set(this, 'dataConductor.demandActive', isDemand);
    },


    onEvOrIcToggle(isEv) {
      set(this, 'dataConductor.evActive', isEv);
    },


    onAggregateOrSweepToggle(isAggregate) {
      set(this, 'dataConductor.aggregateActive', isAggregate);

      if (isAggregate) {
        get(this, 'dataConductor').pauseTimeRange();
      }
    },


    onPlayClick() {
      get(this, 'dataConductor').playTimeRange();
    },


    onPauseClick() {
      get(this, 'dataConductor').pauseTimeRange();
    },
  },


  willDestroyElement() {
    const intervalId = get(this, 'timeRangeIntervalId');

    if (intervalId) {
      clearInterval(intervalId);
    }

    this._super(...arguments);
  },


  changeDataSet() {
    const day = get(this, 'dayOfWeek');
    const sample = get(this, 'evPercentageInFleet');
    const metric = get(this, 'demandActive') ? 'perc_ee' : 'co2_em';


    get(this, 'dataConductor').loadDataSet(day, sample, metric);
  },
});