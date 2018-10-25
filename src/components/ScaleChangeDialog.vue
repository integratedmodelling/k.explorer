<template>
  <q-dialog
    v-if="scaleReference !== null"
    v-model="scaleEditing"
    :title="$t('label.titleChangeScale', { type: scaleEditingType === 'space' ? $t('label.labelSpatial') : $t('label.labelTemporal')})"
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
      'setScaleLocked',
      'updateScaleReference',
    ]),
    ...mapActions('view', [
      'setScaleEditing',
    ]),
    async choose(okFn) {
      console.log(`resolution: ${this.resolution} & unit: ${this.unit}`);
      if (this.resolution === '' || this.resolution <= 0) {
        this.resolutionError = true;
      } else {
        await okFn();
        this.resolutionError = false;
        this.sendStompMessage(MESSAGES_BUILDERS.SCALE_REFERENCE({
          scaleReference: this.scaleReference,
          ...(this.scaleEditingType === 'space' && { spaceResolution: this.resolution }),
          ...(this.scaleEditingType === 'space' && { spaceUnit: this.unit }),
          ...(this.scaleEditingType === 'time' && { timeResolution: this.resolution }),
          ...(this.scaleEditingType === 'time' && { timeUnit: this.unit }),
        }, this.$store.state.data.session).body);
        this.setScaleLocked({ scaleType: this.scaleEditingType, scaleLocked: true });
        this.updateScaleReference({ type: this.scaleEditingType, resolution: this.resolution, unit: this.unit });
        this.$q.notify({
          message: this.$t('messages.updateScale', { type: this.scaleEditingType, resolution: this.resolution, unit: this.unit }),
          type: 'info',
          timeout: 1000,
        });
      }
    },
    initValues() {
      if (this.scaleReference !== null) {
        this.resolution = this.scaleEditingType === 'space' ? this.scaleReference.spaceResolution : this.scaleReference.timeResolution;
        this.unit = this.scaleEditingType === 'space' ? this.scaleReference.spaceUnit : this.scaleReference.timeUnit;
      }
    },
  },
};
</script>

<style>
</style>
