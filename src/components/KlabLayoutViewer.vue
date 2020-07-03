<template>
  <q-layout view="LHh lpR fff" container style="height: 500px; width: 300px;position: absolute; top: 10px;left:10px;z-index:1000" class="shadow-2">
    <q-layout-header reveal>
      <q-toolbar>
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-footer>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>

    <q-layout-drawer v-model="drawer" :width="200" :breakpoint="300">
      <div v-for="n in 50" :key="n">Drawer</div>
    </q-layout-drawer>
    <q-page-container>
      <q-page style="padding-top: 50px">
        <div v-for="n in 50" :key="n">My page</div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutViewer',
  props: {
    layout: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    attributeStyle() {
      return {
        ...this.layout.style,

      };
    },
  },
};
</script>

<style>
</style>
