const path = require('path');
const fs = require('fs-extra');
const open = require('open');
const express = require('express');
const nunjucks = require('nunjucks');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
app.set('view engine', 'html');
nunjucks.configure('./src/templates/', {
  autoescape: true,
  express: app,
  watch: true
})

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/', function(req, res) {
  const contextData = fs.readJsonSync(
    path.resolve(process.cwd(), 'src/templates/data.json'));
  const meta = fs.readJsonSync(
    path.resolve(process.cwd(), 'meta.json'));

  const templateContext = Object.assign({ meta }, contextData);

  res.render('index.html', templateContext);
})

app.listen('3000', function() {
  app.keepAliveTimeout = 0;
  console.log('app started on port 3000');
  open(`http://localhost:3000`);
})
