<template lang="pug">
div
  span.tree-view-item-key {{ keyString }}
  span.tree-view-item-type(v-if='data && !isKnownType') [{{ data.type }}]
  span.tree-view-item-separator :
  span.tree-view-item-value(:class='getValueType(data)') {{ valueFormed }}
  span.tree-view-item-edit(v-if='isKnownType && modifiable' @click.prevent='promptModify') #
  span(v-show='error') {{ error }}
</template>

<script>
import _ from 'lodash';

export default {
  name: 'TreeViewItemValue',
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
    'modifiable': {
      type: Boolean,
      default: false
    },
    'key-string': {
      type: String,
      default: null
    }
  },
  data: function(){
    return {
      valueString: this.data && this.data.toString(),
      error: false,
    };
  },
  computed: {
    valueFormed: function () {
      return this.getValue(this.data);
    },
    isKnownType: function() {
      if(this.dataType === 'json') {
        return true;
      } else {
        return this.data && (this.data.type === 'boolean'
            || this.data.type === 'number'
            || this.data.type === 'string'
            || this.data.type === 'enum'
            || this.data.type === 'null');
      }
    }
  },
  methods: {
    promptModify: function() {
      if(this.dataType === 'sdjson') {
        this.$emit('prompt-modify', [this.data.key], this.data);
      }
    },
    onUpdateData: function() {
      try {
        let v = this.typedValue(this.valueString);
        this.error = false;
        this.$emit('change-data', [], v);
      }
      catch (err) {
        this.error = err;
      }
    },
    typedValue: function(v) {
      if (v == '') { throw 'empty'; }

      let dataType = this.getValueType(this.data, '');

      switch (dataType) {
      case 'number':
        if (_.isNaN(_.toNumber(v))) {
          throw 'only number';
        }
        return _.toNumber(v);
      case 'boolean':
        if (v.toLowerCase() === 'true') { return true; }
        if (v.toLowerCase() === 'false') { return false; }
        throw 'true or false';
      case 'string':
      default:
        return v;
      }
    },
    getValue: function(value){
      if(this.dataType === 'json') {
        if (_.isNumber(value)) {
          return value;
        }
        if (_.isNull(value)) {
          return 'null';
        }
        if (_.isString(value)) {
          return '"' + value + '"';
        }
        return value;
      } else {
        if (value.type === 'string') {
          return '"' + value.value + '"';
        }
        if (value.type === 'null') {
          return 'null';
        }
        return JSON.stringify(value.value);
      }
    },
    getValueType: function(value, prefix='tree-view-item-value-'){
      if(this.dataType === 'json') {
        if (_.isNumber(value)) {
          return prefix + 'number';
        }
        if (_.isFunction(value)) {
          return prefix + 'function';
        }
        if (_.isBoolean(value)) {
          return prefix + 'boolean';
        }
        if (_.isNull(value)) {
          return prefix + 'null';
        }
        if (_.isString(value)) {
          return prefix + 'string';
        }
        return prefix + 'unknown';
      } else {
        if (value.type === 'number') {
          return prefix + 'number';
        }
        if (value.type === 'boolean') {
          return prefix + 'boolean';
        }
        if (value.type === 'null') {
          return prefix + 'null';
        }
        if (value.type === 'string') {
          return prefix + 'string';
        }
        if (value.type === 'enum') {
          return prefix + 'enum';
        }
        return prefix + 'unknown';
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.tree-view-item-edit
  margin-left: 12px
  color: grey
  cursor: pointer

.tree-view-item-type
  color: #757575
  margin-left: 4px

.tree-view-item-separator
  margin-right: 4px
</style>
