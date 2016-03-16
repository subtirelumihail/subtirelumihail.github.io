import webpack            from 'webpack';
import chalk              from 'chalk';
import WebpackDevServer   from 'webpack-dev-server';
import ProgressBarPlugin  from 'progress-bar-webpack-plugin';

// Load custom librarys
import Logger, {log, buidValidLogger, buidInvalidLogger} from './logger';
import cli from './cli';

// Load configs
import webpackConfig    from './webpack.config.babel';
import config from './config';

const {port, hostname} =  config;

// Init the cli
cli.init();

// Configure webpack server
webpackConfig.output.publicPath = '/';

webpackConfig.entry.unshift('webpack/hot/dev-server');
webpackConfig.entry.unshift('webpack-dev-server/client?http://' + hostname + ':' + port);

webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.unshift(new Logger());
webpackConfig.plugins.unshift(
  new ProgressBarPlugin({
    format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    summary: false,
    customSummary: buidValidLogger
  })
);

// Start webpack server
new WebpackDevServer(webpack(webpackConfig), {
  contentBase: webpackConfig.output.path,
  historyApiFallback: true,
  progress: false,
  hot: false,
  inline:   true,
  quiet: false,
  noInfo: true,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    children: false
  },
}).listen(port, '0.0.0.0', (err) => {
  if (err) {
    log(chalk.red(err));
    buidInvalidLogger();
  }
});
