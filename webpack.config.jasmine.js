/**
 * Created by keyvan on 8/31/16.
 */

var webpack = require('webpack');
var path = require('path');
var fs = require("file-system");

var mods = {};
fs.readdirSync("node_modules")
    .filter(x => [".bin"].indexOf(x) === -1)
    .forEach(mod => {
        mods[mod] = "commonjs " + mod;
    });

var plugins = [];

var config = {
    entry: './src/spec/index.js',
    devtool: 'source-map',
    output: {
        path: './spec',
        filename: 'all.spec.js'
    },
    externals: mods,
    module: {
        loaders: [
            // Support for ES6 modules and the latest ES syntax.
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel",
                query: {
                    presets: ["es2015", "stage-0"],
                    plugins: [
                        ["transform-runtime", {
                            "polyfill": false,
                            "regenerator": true
                        }]
                    ]
                }
            }
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins
};

module.exports = config;