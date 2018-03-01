<template lang="pug">
.tree-view-item
  .tree-view-item-leaf(v-if='isObject(data)')
    .tree-view-item-node(@click.stop='toggleOpen()')
      span.tree-view-item-key.tree-view-item-key-with-chevron(:class='{opened: isOpen()}') {{getKey(data)}}
      span.tree-view-item-hint(v-show='!isOpen() && data.children.length === 1') {{data.children.length}} property
      span.tree-view-item-hint(v-show='!isOpen() && data.children.length !== 1') {{data.children.length}} properties
    tree-view-item(:key='getKey(child)', :max-depth='maxDepth', :current-depth='currentDepth+1', v-show='isOpen()', v-for='child in data.children', :data='child' :data-type='dataType', :modifiable='modifiable', @change-data='onChangeData')
  .tree-view-item-leaf(v-if='isArray(data)')
    .tree-view-item-node(@click.stop='toggleOpen()')
      span.tree-view-item-key.tree-view-item-key-with-chevron(:class='{opened: isOpen()}') {{getKey(data)}}
      span.tree-view-item-hint(v-show='!isOpen() && data.children.length === 1') {{data.children.length}} item
      span.tree-view-item-hint(v-show='!isOpen() && data.children.length !== 1') {{data.children.length}} items
    tree-view-item(:key='getKey(child)', :max-depth='maxDepth', :current-depth='currentDepth+1', v-show='isOpen()', v-for='child in data.children', :data='child' :data-type='dataType', :modifiable='modifiable', @change-data='onChangeData')
  tree-view-item-value.tree-view-item-leaf(v-if='isValue(data)', :key-string='getKey(data)', :data='getValue(data)' :data-type='dataType', :modifiable='modifiable', @change-data='onChangeData')
</template>

<script>
import _ from 'lodash';
import TreeViewItemValue from './TreeViewItemValue.vue';

export default {
  name: 'TreeViewItem',
  components: {
    TreeViewItemValue
  },
  props: {
    'data': {
      type: [Object, Array, String, Number, Boolean, Symbol],
      default: () => {return {};}
    },
    'data-type': {
      type: String,
      validator: (value) => {
        // plain json or self descriptive json
        return value === 'json' || value === 'sdjson';
      },
      default: 'json'
    },
    'max-depth': {
      type: Number,
      default: 3
    },
    'current-depth': {
      type: Number,
      default: 0
    },
    'modifiable': {
      type: Boolean,
      default: false
    },
  },
  data: function(){
    return {
      open: this.currentDepth < this.maxDepth
    };
  },
  methods: {
    isOpen: function(){
      return this.open;
    },
    toggleOpen:function(){
      this.open = !this.open;
    },
    isObject: function(value){
      return value.type === 'object';
    },
    isArray: function(value){
      return value.type === 'array';
    },
    isValue: function(value){
      if(this.dataType === 'json') {
        return value.type === 'value';
      } else {
        return (value.type === 'boolean'
          || value.type === 'number'
          || value.type === 'string'
          || value.type === 'enum'
          || value.type === 'null');
      }
    },
    getKey: function(value){
      if (_.isInteger(value.key)) {
        return value.key+':';
      } else {
        return '"' + value.key + '":';
      }
    },
    getValue(data) {
      if(this.dataType === 'json') {
        return data.value;
      } else {
        return data;
      }
    },
    isRootObject: function(value = this.data){
      return value.isRoot;
    },
    onChangeData: function(path, value) {
      path = _.concat(this.data.key, path);
      this.$emit('change-data', path, value);
    }
  }
};
</script>

<style lang="sass" scoped>

.tree-view-item
  font-family: monaco, monospace
  font-size: 14px
  margin-left: 18px

.tree-view-item-node 
  cursor: pointer
  position: relative
  white-space: nowrap

.tree-view-item-leaf 
  white-space: nowrap

.tree-view-item-key 
  font-weight: bold

.tree-view-item-key-with-chevron 
  padding-left: 14px


.tree-view-item-key-with-chevron.opened::before 
  top: 4px
  transform: rotate(90deg)
  -webkit-transform: rotate(90deg)

.tree-view-item-key-with-chevron::before 
  color: #444
  content: '\25b6'
  font-size: 10px
  left: 1px
  position: absolute
  top: 3px
  transition: -webkit-transform .1s ease
  transition: transform .1s ease
  transition: transform .1s ease, -webkit-transform .1s ease
  -webkit-transition: -webkit-transform .1s ease

.tree-view-item-hint 
  color: #ccc

</style>
