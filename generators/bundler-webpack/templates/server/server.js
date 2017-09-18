const path = require('path');
const fs = require('fs-extra');
const open = require('open');
const express = require('express');
<% if (context) { %>
const context = require('./context.js');
<% } %>
const nunjucks = require('nunjucks');
const safe = require('nunjucks').runtime.markSafe;
const marked = require('marked');
const router = require('./router.js');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack-dev.config.js');
const { argv } = require('yargs');

const app = express();
app.use('/', router);

app.set('view engine', 'html');

const env = nunjucks.configure('./src/templates/', {
  autoescape: true,
  express: app,
  watch: true
});
env.addFilter('markdown', (str, kwargs) => {
  // strip outer <p> tags?
  const strip = typeof kwargs === 'undefined' ?
    false : kwargs.strip || false;
  return !strip ? safe(marked(str)) :
    safe(marked(str).trim().replace(/^<p>|<\/p>$/g, ''));
});

app.use(express.static('src'))

function startServer(port) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.listen(port, function() {
    app.keepAliveTimeout = 0;
  })

  middleware.waitUntilValid(() => {
    console.log(`app started on port ${port}`);
    open(`http://localhost:${port}`);
  });
};

function renderIndex() {
  process.env.NODE_ENV = 'production';
  <% if (context) { %>
  const ctx = context.getContext();
  <% } else { %>
  const ctx = {};
  <% } %>
  ctx['env'] = process.env.NODE_ENV;

  app.render('index.html', ctx, function(err, html) {
    fs.writeFileSync('dist/index.html', html);
    console.log('dist/index.html written');
    process.exit();
  });
};

if (argv.render) {
  renderIndex();
} else {
  startServer(argv.port || 3000);
}
