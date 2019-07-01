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
      <q-select
        :float-label="$t('label.unitLabel')"
        v-model="unit"
        color="info"
        :options="units"
      ></q-select>
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn color="info" outline label="Cancel" @click="props.cancel" />
      <q-btn color="info" label="Ok" @click="choose(props.ok)" />
    </template>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import { SCALE_TYPE } from 'shared/Constants';

export default {
  name: 'ScaleChangeDialog',
  data() {
    return {
      resolution: null,
      unit: null,
      units: [
        {
          label: this.$t('label.labelCm'),
          value: 'cm',
        }, {
          label: this.$t('label.labelM'),
          value: 'm',
        }, {
          label: this.$t('label.labelKm'),
          value: 'km',
        },
      ],
      resolutionError: false,
      SCALE_TYPE,
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
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
        this.setScaleEditing({ active, type: this.scaleEditingType });
      },
    },
  },
  methods: {
    ...mapActions('data', [
      'updateScaleReference',
    ]),
    ...mapActions('view', [
      'setScaleEditing',
    ]),
    async choose(okFn) {
      console.info(`Resolution: ${this.resolution} and unit: ${this.unit}`);
      if (this.resolution === '' || this.resolution <= 0) {
        this.resolutionError = true;
      } else {
        await okFn();
        this.resolutionError = false;
        this.sendStompMessage(MESSAGES_BUILDERS.SCALE_REFERENCE({
          scaleReference: this.scaleReference,
          ...(this.scaleEditingType === SCALE_TYPE.ST_SPACE && { spaceResolutionConverted: this.resolution }),
          ...(this.scaleEditingType === SCALE_TYPE.ST_SPACE && { spaceUnit: this.unit }),
          ...(this.scaleEditingType === SCALE_TYPE.ST_TIME && { timeResolution: this.resolution }),
          ...(this.scaleEditingType === SCALE_TYPE.ST_TIME && { timeUnit: this.unit }),
        }, this.$store.state.data.session).body);
        this.updateScaleReference({ type: this.scaleEditingType, resolution: this.resolution, unit: this.unit });
        this.$q.notify({
          message: this.$t('messages.updateScale', { type: this.scaleEditingType, resolution: this.resolution, unit: this.unit }),
          type: 'info',
          icon: 'mdi-information',
          timeout: 1000,
        });
      }
    },
    initValues() {
      if (this.scaleReference !== null) {
        this.resolution = this.scaleEditingType === SCALE_TYPE.ST_SPACE ? this.scaleReference.spaceResolutionConverted : this.scaleReference.timeResolution;
        this.unit = this.scaleEditingType === SCALE_TYPE.ST_SPACE ? this.scaleReference.spaceUnit : this.scaleReference.timeUnit;
      }
    },
  },
};
</script>

<style>
</style>
