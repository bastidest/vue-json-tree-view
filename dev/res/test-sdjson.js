module.exports = {
  type: 'object',
  key: '__root__',
  children: [{
    type: 'object',
    key: 'colors',
    children: [{
      type: 'object',
      key: 'red',
      children: [{
        type: 'string',
        key: 'code',
        value: 'f00'
      }, {
        type: 'boolean',
        key: 'enabled',
        value: false
      }]
    }, {
      type: 'object',
      key: 'green',
      children: [{
        type: 'string',
        key: 'code',
        value: '0f0'
      }, {
        type: 'boolean',
        key: 'enabled',
        value: true
      }]
    }, {
      type: 'object',
      key: 'blue',
      children: [{
        type: 'string',
        key: 'code',
        value: '00f'
      }, {
        type: 'boolean',
        key: 'enabled',
        value: false
      }]
    }]
  }, {
    type: 'enum',
    values: ['started', 'stopped'],
    key: 'state',
    value: 'started'
  }, {
    type: 'number',
    key: 'counter',
    value: 54
  }, {
    type: 'array',
    key: 'services',
    children: [{
      type: 'string',
      key: 0,
      value: 'initd'
    }, {
      type: 'null',
      key: 1
    }, {
      type: 'number',
      key: 2,
      value: 55
    }]
  }, {
    type: 'object',
    key: 'other_services',
    children: [{
      type: 'string',
      key: 0,
      value: 'apache2'
    }, {
      type: 'string',
      key: 1,
      value: 'nginx'
    }]
  }]
};