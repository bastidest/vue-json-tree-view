<template lang="pug">
.app
  h1 Dev test
  tree-view(:data='data')
</template>

<script>
import Vue from 'vue';
import TreeView from '../src';
Vue.use(TreeView);

import testJson from './res/test-json';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      data: testJson
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {

  }
};

</script>

<style lang="sass">

</style>
