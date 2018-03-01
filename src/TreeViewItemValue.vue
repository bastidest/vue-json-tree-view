<template lang="pug">
div
  span.tree-view-item-key {{ keyString }}
  input.tree-view-item-value(v-if='modifiable', :class='getValueType(data)', v-model='valueString', @keyup.enter='onUpdateData', @blur='onUpdateData')
  span.tree-view-item-value(v-else, :class='getValueType(data)') {{ valueFormed }}
  span(v-show='error') {{ error }}
</template>

<script>
import _ from 'lodash';

export default {
  name: 'TreeViewItem',
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
    }
  },
  methods: {
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
        return value.value;
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
