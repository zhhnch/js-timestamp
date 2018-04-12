const path = require('path');

function resolve(file) {
  return path.join(__dirname, '..', file);
}

module.exports = {
  entry: './src/timestamp.js',
  output: {
    path: resolve('dist'),
    filename: 'timestamp.js',
    // library: 'timestamp',
  },
};
