module.exports = {
  colors: {
    red: {
      code: 'f00',
      enabled: false
    },
    green: {
      code: '0f0',
      enabled: true
    },
    blue: {
      code: '00f',
      enabled: false
    }
  },
  state: 'started',
  counter: 54,
  services: [
    'initd', null, 55
  ],
  other_services: {
    0: 'apache2',
    1: 'nginx'
  }
};