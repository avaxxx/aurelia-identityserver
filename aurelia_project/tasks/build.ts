import * as webpackConfig from '../../webpack.config';
import * as webpackVendorConfig from '../../webpack.config.vendor';
import * as webpack from 'webpack';
let project = require('../aurelia.json');
import {CLIOptions, Configuration} from 'aurelia-cli';
import * as gulp from 'gulp';
import configureEnvironment from './environment';
import * as del from 'del';

const buildOptions = new Configuration(project.build.options);
const production = CLIOptions.getEnvironment() === 'prod';
// const extractCss = buildOptions.isApplicable('extractCss');
var gutil = require('gulp-util');

let displayStatistics = false;
gutil.log('starting!');
if (CLIOptions.hasFlag('display-statistics'))
{
  displayStatistics = CLIOptions.getFlagValue('display-statistics');
}
const config = webpackConfig({
  production, displayStatistics
});
const compiler = webpack(<any>config);

const configVendor = webpackVendorConfig({
  production, displayStatistics
});
const compilerConfig = webpack(<any>configVendor);

function buildWebpack(done) {
    compiler.run(onBuild);
    compiler.plugin('done', () => done());
}

function buildWebpackVendor(done) {
    compilerConfig.run(onBuild);
    compilerConfig.plugin('done', () => done());
}

function onBuild(err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    process.exit(1);
  } else {
    process.stdout.write(stats.toString({ colors: require('supports-color') }) + '\n');
  }
}

function clearDist() {
  return del([config.output.path]);
}

const build = gulp.series(
  clearDist,
  configureEnvironment,
  buildWebpackVendor,
  buildWebpack
);

export {
  config,
  buildWebpackVendor,
  buildWebpack,
  build as default
};
