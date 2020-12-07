<template>
  <q-dialog
    v-if="scaleReference !== null"
    v-model="scaleEditing"
    :title="$t('label.titleChangeScale', { type: scaleEditingType === SCALE_TYPE.ST_SPACE ? $t('label.labelSpatial') : $t('label.labelTemporal')})"
    color="info"
    :cancel="true"
    :ok="false"
    @show="initValues"
  >
    <div slot="body">
      <template v-if="scaleEditingType === SCALE_TYPE.ST_SPACE">
        <q-input
          v-model="resolution"
          type="number"
          min="0"
          color="info"
          autofocus
          :after="[{
              icon: 'warning',
              error: true,
              condition: resolutionError,
          }]"
          :stack-label="resolutionError ? $t('messages.changeScaleResolutionError') : $t('label.resolutionLabel')"></q-input>
      </template>
      <q-select
        :float-label="$t('label.unitLabel')"
        v-model="unit"
        color="info"
        :options="typedUnits(scaleEditingType)"
        @input="scaleEditingType === SCALE_TYPE.ST_TIME && setStartDate()"
      ></q-select>
      <template v-if="scaleEditingType === SCALE_TYPE.ST_TIME">
        <div class="row">
          <q-input
            v-if="unit === SCALE_VALUES.DECADE"
            class="col col-4"
            :float-label="$t('label.unitDecade')"
            v-model="unitInputs.decade"
            type="number"
            min="0"
            max="90"
            :step="10"
            color="mc-main"
            @input="setStartDate()"
            autofocus
          >
          </q-input>
          <q-input
            v-if="unit === SCALE_VALUES.CENTURY || unit === SCALE_VALUES.DECADE"
            :class="[ 'col', unit === SCALE_VALUES.CENTURY ? 'col-8' : 'col-4']"
            :float-label="$t('label.unitCentury')"
            v-model="unitInputs.century"
            type="number"
            min="1"
            :step="1"
            color="mc-main"
            @input="setStartDate()"
            autofocus
          >
          </q-input>
          <q-select
            :float-label="$t('label.unitMonth')"
            v-if="unit === SCALE_VALUES.MONTH"
            class="col col-4"
            v-model="unitInputs.month"
            type="number"
            min="0"
            color="mc-main"
            @input="setStartDate()"
            :options="monthOptions"
            autofocus
          >
          </q-select>
          <q-input
            v-if="unit === SCALE_VALUES.WEEK"
            :float-label="$t('label.unitWeek')"
            v-model="unitInputs.week"
            class="col col-4"
            type="number"
            min="1"
            max="53"
            :step="1"
            color="mc-main"
            @input="setStartDate($event)"
            autofocus
          >
          </q-input>
          <q-input
            v-if="unit === SCALE_VALUES.YEAR || unit === SCALE_VALUES.MONTH || unit === SCALE_VALUES.WEEK"
            :float-label="$t('label.unitYear')"
            :class="{ 'col': unit === SCALE_VALUES.YEAR, 'col-8': unit === SCALE_VALUES.YEAR, 'col-4': (unit === SCALE_VALUES.MONTH || unit === SCALE_VALUES.WEEK) }"
            v-model="unitInputs.year"
            type="number"
            min="0"
            :step="1"
            color="mc-main"
            @input="setStartDate()"
            autofocus
          >
          </q-input>
          <q-input
            v-if="unit === SCALE_VALUES.CENTURY || unit === SCALE_VALUES.DECADE ||
             unit === SCALE_VALUES.YEAR || unit === SCALE_VALUES.MONTH || unit === SCALE_VALUES.WEEK"
            :float-label="$t('label.timeResolutionMultiplier')"
            class="col col-4"
            :class="{ 'scd-inactive-multiplier': timeEndModified }"
            v-model="timeResolutionMultiplier"
            type="number"
            min="1"
            :step="1"
            color="mc-main"
          >
            <q-tooltip
              v-if="timeEndModified"
              :offset="[0, 15]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('messages.timeEndModified') }}</q-tooltip>
          </q-input>
        </div>
        <q-datetime
          color="mc-main"
          :float-label="$t('label.labelTimeStart')"
          v-model="timeStart"
          :format="getFormat()"
          :type="unit === SCALE_VALUES.HOUR || unit === SCALE_VALUES.MINUTE || unit === SCALE_VALUES.SECOND ? 'datetime' : 'date'"
          minimal
          format24h
          @focus="manualInputChange = true"
          @blur="manualInputChange = false"
          @input="manualInputChange && initUnitInputs() && calculateEnd()"
          :default-view="unit === SCALE_VALUES.CENTURY || unit === SCALE_VALUES.DECADE ||
             unit === SCALE_VALUES.YEAR ? 'year' : 'day'"
        ></q-datetime>
        <q-datetime
          color="mc-main"
          :float-label="$t('label.labelTimeEnd')"
          v-model="timeEnd"
          :format="getFormat()"
          :type="unit === SCALE_VALUES.HOUR || unit === SCALE_VALUES.MINUTE || unit === SCALE_VALUES.SECOND ? 'datetime' : 'date'"
          minimal
          format24h
          @input="checkEnd"
          :after="[{
            icon: 'warning',
            error: true,
            condition: resolutionError,
          }]"
          :default-view="unit === SCALE_VALUES.CENTURY || unit === SCALE_VALUES.DECADE ||
             unit === SCALE_VALUES.YEAR ? 'year' : 'day'"

        ></q-datetime>
      </template>
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn color="mc-main" outline :label="$t('label.appCancel')" @click="props.cancel"></q-btn>
      <q-btn color="mc-main" :label="$t('label.appOK')" @click="choose(props.ok)"></q-btn>
    </template>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment-timezone';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import { SCALE_TYPE, SCALE_VALUES, SCALE_UNITS } from 'shared/Constants';

export default {
  name: 'ScaleChangeDialog',
  data() {
    return {
      resolution: null, // only aplicable to space
      timeResolutionMultiplier: 1, // only aplicable to time
      timeStart: null, // only aplicable to time
      timeEnd: null, // only aplicable to time
      timeEndMod: false,
      unit: null,
      units: SCALE_UNITS,
      resolutionError: false,
      SCALE_TYPE,
      SCALE_VALUES,
      unitInputs: {
        century: null,
        // decade: null,
        year: null,
        month: null,
        week: null,
      },
      monthOptions: [],
      timeEndModified: false,
      manualInputChange: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      'nextScale',
      'hasContext',
      // 'timeReference',
    ]),
    ...mapGetters('view', [
      'scaleEditingType',
    ]),
    scaleEditing: {
      get() {
        return this.$store.getters['view/isScaleEditing'];
      },
      set(active) {
        this.$store.dispatch('view/setScaleEditing', { active, type: this.scaleEditingType });
      },
    },
    typedUnits() {
      return type => this.units.filter(u => u.type === type && u.selectable).map(u => ({
        ...u,
        label: this.$t(`label.${u.i18nlabel}`),
      }));
    },
  },
  methods: {
    ...mapActions('data', [
      'updateScaleReference',
      'setNextScale',
    ]),
    choose(okFn) {
      if (this.scaleEditingType === SCALE_TYPE.ST_SPACE && (this.resolution === '' || this.resolution <= 0)) {
        this.resolutionError = true;
      } else if (this.scaleEditingType === SCALE_TYPE.ST_TIME && !this.checkEnd) {
        this.resolutionError = true;
      } else {
        okFn();
        this.resolutionError = false;
        if ((this.scaleEditingType === SCALE_TYPE.ST_SPACE
            && ((this.nextScale === null && (
              this.resolution === this.scaleReference.spaceResolutionConverted
              && this.unit === this.scaleReference.spaceUnit))
              || (this.nextScale !== null && (
                this.resolution === this.nextScale.spaceResolutionConverted
                && this.unit === this.nextScale.spaceUnit))))
          || (this.scaleEditingType === SCALE_TYPE.ST_TIME
            && ((this.nextScale === null && (
              this.timeResolutionMultiplier === this.scaleReference.timeResolutionMultiplier
              && this.unit === this.scaleReference.timeUnit
              && this.timeStart === this.scaleReference.start
              && this.timeEnd === this.scaleReference.end))
              || (this.nextScale !== null && (
                this.timeResolutionMultiplier === this.nextScale.timeResolutionMultiplier
                && this.unit === this.nextScale.timeUnit
                && this.timeStart === this.nextScale.start
                && this.timeEnd === this.nextScale.end))))) {
          return;
        }
        const timeStart = new Date(this.timeStart.getTime());
        const timeEnd = new Date(this.timeEnd.getTime());
        if ([SCALE_VALUES.MILLENNIUM, SCALE_VALUES.CENTURY, SCALE_VALUES.DECADE, SCALE_VALUES.YEAR, SCALE_VALUES.MONTH, SCALE_VALUES.WEEK, SCALE_VALUES.DAY].includes(this.unit)) {
          timeStart.setUTCHours(0, 0, 0, 0);
          timeEnd.setUTCHours(0, 0, 0, 0);
        }
        if (!this.hasContext) {
          this.sendStompMessage(MESSAGES_BUILDERS.SCALE_REFERENCE({
            scaleReference: this.scaleReference,
            ...(this.scaleEditingType === SCALE_TYPE.ST_SPACE && {
              spaceResolution: this.resolution,
              spaceUnit: this.unit,
            }),
            ...(this.scaleEditingType === SCALE_TYPE.ST_TIME && {
              timeResolutionMultiplier: this.timeResolutionMultiplier,
              timeUnit: this.unit,
              start: timeStart.getTime(),
              end: timeEnd.getTime(),
            }),
          }, this.$store.state.data.session).body);
        }
        this.updateScaleReference({
          type: this.scaleEditingType,
          unit: this.unit,
          ...(this.scaleEditingType === SCALE_TYPE.ST_SPACE && {
            spaceResolution: this.resolution,
            spaceResolutionConverted: this.resolution,
          }),
          ...(this.scaleEditingType === SCALE_TYPE.ST_TIME && {
            timeResolutionMultiplier: this.timeResolutionMultiplier,
            start: timeStart.getTime(),
            end: timeEnd.getTime(),
          }),
          next: this.hasContext,
        });
        this.$q.notify({
          message: this.$t(this.hasContext ? 'messages.updateNextScale' : 'messages.updateScale', { type: this.scaleEditingType.charAt(0).toUpperCase() + this.scaleEditingType.slice(1) }), // , resolution: this.resolution, unit: this.unit }),
          type: 'info',
          icon: 'mdi-information',
          timeout: 2000,
        });
      }
    },
    setStartDate(event) {
      // As ISO 8601-1 say:
      // century: time scale unit (3.1.1.7) of 100 calendar years (3.1.2.21)duration (3.1.1.8), beginning with a year whose year number is divisible without remainder by 100
      // decade: time scale unit (3.1.1.7) of 10 calendar years (3.1.2.21), beginning with a year whose year number is divisible without remainder by ten
      const date = new Date();
      switch (this.unit) {
        case SCALE_VALUES.CENTURY:
          date.setUTCDate(1);
          date.setUTCMonth(0);
          date.setUTCFullYear((this.unitInputs.century - 1) * 100);
          break;
        case SCALE_VALUES.DECADE:
          this.unitInputs.decade = this.unitInputs.decade - (this.unitInputs.decade % 10);
          date.setUTCDate(1);
          date.setUTCMonth(0);
          date.setUTCFullYear(((this.unitInputs.century - 1) * 100) + this.unitInputs.decade);
          break;
        case SCALE_VALUES.YEAR:
          date.setUTCFullYear(this.unitInputs.year, 0, 1);
          break;
        case SCALE_VALUES.MONTH:
          date.setUTCDate(1);
          date.setUTCMonth(this.unitInputs.month);
          date.setUTCFullYear(this.unitInputs.year);
          break;
        case SCALE_VALUES.WEEK:
          if (event > 53) {
            this.unitInputs.week = moment(this.timeStart).week();
            return;
          }
          date.setUTCMonth(0);
          date.setUTCDate(1 + (this.unitInputs.week - 1) * 7);
          date.setUTCFullYear(this.unitInputs.year);
          break;
        default:
          return;
      }
      this.timeStart = date;
      this.initUnitInputs();
      this.calculateEnd();
    },
    calculateEnd(manual = false) {
      const unit = SCALE_UNITS.find(u => u.value === this.unit);
      this.timeEnd = moment(this.timeStart).add((this.timeResolutionMultiplier * unit.momentMultiplier) - (unit.momentMultiplier !== 1 ? 1 : 0), unit.momentShorthand).toDate();
      this.$nextTick(() => { this.timeEndModified = manual; });
    },
    checkEnd() {
      if (this.timeEnd <= this.timeStart) {
        this.$q.notify({
          message: this.$t('messages.timeEndBeforeTimeStart'),
          type: 'info',
          icon: 'mdi-information',
          timeout: 2000,
        });
      } else {
        this.calculateEnd(true);
      }
    },
    getFormat() {
      switch (this.unit) {
        case SCALE_VALUES.MILLENNIUM:
        case SCALE_VALUES.CENTURY:
        case SCALE_VALUES.DECADE:
        case SCALE_VALUES.YEAR:
        case SCALE_VALUES.MONTH:
        case SCALE_VALUES.WEEK:
        case SCALE_VALUES.DAY:
          return 'DD/MM/YYYY';
        case SCALE_VALUES.HOUR:
          return 'DD/MM/YYYY HH:mm';
        case SCALE_VALUES.MINUTE:
        case SCALE_VALUES.SECOND:
          return 'DD/MM/YYYY HH:mm:ss';
        case SCALE_VALUES.MILLISECOND:
          return 'DD/MM/YYYY HH:mm:ss:SSS';
        default:
          return 'DD/MM/YYYY HH:mm:ss';
      }
    },
    formatDate(date, format = 'dddd, MMMM Do YYYY, h:mm:ss a') {
      if (date && date !== null) {
        return moment(date).format(format);
      }
      return '';
    },
    initValues() {
      const scale = this.nextScale !== null ? this.nextScale : (this.scaleReference !== null ? this.scaleReference : null);
      if (scale !== null) {
        this.resolution = scale.spaceResolutionConverted;
        this.unit = this.scaleEditingType === SCALE_TYPE.ST_SPACE ? scale.spaceUnit : scale.timeUnit !== null ? scale.timeUnit : SCALE_VALUES.YEAR;
        this.timeResolutionMultiplier = scale.timeResolutionMultiplier !== 0 ? scale.timeResolutionMultiplier : 1;
        this.timeStart = scale.start !== 0 ? new Date(scale.start) : new Date();
        this.calculateEnd();
      }
      this.initUnitInputs();
    },
    initUnitInputs() {
      const momentDate = this.timeStart ? moment(this.timeStart) : moment();
      this.unitInputs.century = Math.floor(momentDate.year() / 100) + 1;
      this.unitInputs.decade = Math.floor(momentDate.year() / 10) * 10 - Math.floor(momentDate.year() / 100) * 100; // sorry
      this.unitInputs.year = momentDate.year();
      this.unitInputs.month = momentDate.month();
      this.unitInputs.week = momentDate.week();
    },
  },
  watch: {
    timeResolutionMultiplier(newValue, oldValue) {
      if (newValue < 1) {
        this.timeResolutionMultiplier = oldValue;
      } else {
        this.calculateEnd();
      }
    },
  },
  created() {
    for (let i = 0; i < 12; i++) {
      this.monthOptions.push({
        label: this.$t(`label.months.m${i}`),
        value: i,
      });
    }
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .scd-inactive-multiplier .q-input-target
      color #979797 // same of quasar style
</style>
