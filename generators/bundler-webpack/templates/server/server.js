const open = require('open');
const express = require('express');
const nunjucks = require('nunjucks');
const nunjucksSettings = require('./nunjucks-settings.js');
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
  watch: true,
});
env.addFilter('markdown', nunjucksSettings.markdownFilter);

app.use(express.static('src'));
app.use('/images', express.static('dist/images'));
app.use('/data', express.static('dist/data'));

function startServer(port) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.listen(port, () => {
    app.keepAliveTimeout = 0;
  });

  middleware.waitUntilValid(() => {
    console.log(`app started on port ${port}`);
    open(`http://localhost:${port}`);
  });
}

startServer(argv.port || 3000);
