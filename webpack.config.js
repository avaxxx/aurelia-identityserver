const path = require('path');
const  webpack = require('webpack');
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const project = require('./aurelia_project/aurelia.json');
const Visualizer = require('webpack-visualizer-plugin');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

const bundleOutputDir = './wwwroot/dist';

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

module.exports = ({production,displayStatistics} = {}) => ({
        //stats: { modules: true },
        //stats: "detailed",
        entry: { 'app': 'aurelia-bootstrapper' },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: ['ClientApp', 'node_modules', 'kendo/js'],
            alias: {
                //'admin': path.resolve('ClientApp/app/components/admin.html'),
                // 'layout': path.resolve('ClientApp/app/app/layout.html'),
                }
        },
        output: {
            path: path.resolve(bundleOutputDir),
            publicPath: '/dist/',
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.html$/i, use: 'html-loader' },
                { test: /\.css$/i, use: !production ? 'css-loader' : 'css-loader?minimize' },
                {
                    test: /\.css$/i,
                    loader: ['style-loader', 'css-loader'],
                    issuer: /\.[tj]s$/i
                },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000' },
                // { test: /\.json$/i, use: 'json-loader' }
            ]
        },
        plugins: [
            new CheckerPlugin(),         
            new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(!production) }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new webpack.ProvidePlugin({
                'Promise': 'bluebird',
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery',
              }),
            new AureliaPlugin({ aureliaApp: 'main' }),
            new ModuleDependenciesPlugin({
                "aurelia-authentication": ["./authFilterValueConverter"],
                "aurelia-open-id-connect": [
                    "./open-id-connect-user-block",
                    "./open-id-connect-role-filter",
                    "./open-id-connect-user-debug"
                ],
                "aurelia-i18n":[
                    // PLATFORM.moduleName(path.join(__dirname,"./ClientApp/locales/en/translation.json")),
                    // PLATFORM.moduleName(path.join(__dirname,"./ClientApp/locales/fr/translation.json"))
                    // "../../../../ClientApp/resources/locales/en/translation.json",
                    // "../../../../ClientApp/resources/locales/fr/translation.json"
                ]
              }),
              ...when(displayStatistics,  new Visualizer({
                filename: './statistics.html'
              })),
               ...when(!production, new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')  // Point sourcemap entries to the original file locations on disk
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
})
