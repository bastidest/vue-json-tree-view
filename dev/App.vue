<template lang="pug">
.app
  h1 Dev test
  .one
    tree-view(data-type='json' :data='json' :options='options')
  .two
    tree-view(data-type='sdjson' :data='sdjson' :options='options')
</template>

<script>
import Vue from 'vue';
import TreeView from '../src';
Vue.use(TreeView);

import testJson from './res/test-json';
import testSdjson from './res/test-sdjson';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      json: testJson,
      sdjson: testSdjson,
      options: {
        modifiable: true
      }
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
.tree-view-item-value-string
  color: red

.tree-view-item-value-number, .tree-view-item-value-null
  color: blue

.tree-view-item-value-boolean
  color: green

.tree-view-item-value-enum
  color: #da5d04

.tree-view-item-value-unknown
  color: #757575

.one, .two
  width: 50%
  display: inline-block
</style>
