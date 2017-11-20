var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('vendor.css');
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

module.exports = ({ production, displayStatistics } = {}) => {
    const isDevBuild = !production;
    
    return [{
        stats: { modules: false },
        resolve: {
            extensions: ['.js']
        },
        module: {
            loaders: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000' },
                { test: /\.css(\?|$)/, loader: extractCSS.extract([isDevBuild ? 'css-loader' : 'css-loader?minimize']) }
            ]
        },
        entry: {
            vendor: [
                'aurelia-event-aggregator',
                'aurelia-fetch-client',
                'aurelia-framework',
                'aurelia-history-browser',
                'aurelia-logging-console',
                'aurelia-pal-browser',
                'aurelia-polyfills',
                'aurelia-route-recognizer',
                'aurelia-router',
                'aurelia-templating-binding',
                'aurelia-templating-resources',
                'aurelia-templating-router',
                'bootstrap',
                'bootstrap/dist/css/bootstrap.css',
                'jquery',
                'aurelia-authentication',
                'aurelia-kendoui-bridge'
            ],
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        plugins: [
            // new Visualizer({
            //     filename: './statistics-vendor.html'
            //   }),
            extractCSS,
            // new AureliaPlugin({ aureliaApp: undefined, dist: "native-modules" }),
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
            ...when(displayStatistics,  new Visualizer({
                filename: './statistics-vendor.html'
              })),
            ...when(production, new UglifyJsPlugin({ parallel:true })),
            new BrotliGzipPlugin({
                asset: '[path].br[query]',
                algorithm: 'brotli',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8
                }),
                new BrotliGzipPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.(js|css|html|svg)$/,
                    threshold: 10240,
                    minRatio: 0.8
                }),
        ]
    }]
};
