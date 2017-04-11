const config = require('./../../webpack.config.js');
const gutil = require('gulp-util');
const open = require('open');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = (cb) => {
  const compiler = Webpack(config);

  const server = new WebpackDevServer(compiler, config.devServer);

  const port = config.devServer.port || '8080';
  const protocol = config.devServer.https ? 'https' : 'http';

  server.listen(port, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `${protocol}://localhost:${port}/webpack-dev-server/index.html`);
    open(`${protocol}://localhost:${port}/webpack-dev-server/index.html`);
    cb();
  });
};
