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

app.get('/', function(req, res) {
  const ctx = getContext();
  res.render('index.html', ctx);
});

function getContext() {
  const contextData = fs.readJsonSync(
    path.resolve(process.cwd(), 'src/templates/data.json'));
  const meta = fs.readJsonSync(
    path.resolve(process.cwd(), 'meta.json'));

  const templateContext = Object.assign({ meta }, contextData);
  templateContext['env'] = process.env.NODE_ENV;
  return templateContext;
}


module.exports = {
  startServer: (port) => {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.listen(port, function() {
      app.keepAliveTimeout = 0;
      console.log(`app started on port ${port}`);
      open(`http://localhost:${port}`);
    })
  },
  renderIndex: () => {
    process.env.NODE_ENV = 'production';
    const ctx = getContext();

    app.render('index.html', ctx, function(err, html) {
      fs.writeFileSync('dist/index.html', html);
      console.log('dist/index.html written');
    })
  }
}
