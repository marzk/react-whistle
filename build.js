const webpack = require('webpack');
const gzipSize = require('gzip-size');
const fs = require('fs');
const path = require('path');
const pretty = require('prettysize');

const config = require('./webpack.config.js');

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
  }
  console.log(`gzip size: ${pretty(gzipSize.sync(fs.readFileSync(path.join(__dirname, 'dist/whistle.js'))))}`);
});


