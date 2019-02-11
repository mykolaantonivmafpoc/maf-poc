if (process.env.NODE_ENV === 'production') {
  module.exports = require('./appStore.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./appStore.dev'); // eslint-disable-line global-require
}
