var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_modules_dir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Webpack = require('webpack');


var config = {
    addVendor: function (name, path) {
     this.resolve.alias[name] = path; // Add the name of the vendor as an alias to webpack knows where to find it
     this.module.noParse.push(path); // Add the path of the vendor to the "no parse" list
     this.entry.vendors.push(name); // Add the vendor to the list of 'Vendors' which will compile in a seperate chunk
   },
    entry: {
        app: [path.resolve(__dirname, 'app/main.js')],
        vendors: []
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '/js/main.js',
    },
    module: {
        noParse: [],
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "keyMirror":path.resolve(node_modules_dir, 'react/lib/keyMirror.js')
        }
    },
    plugins: [
        new ExtractTextPlugin("/css/main.css", {
            allChunks: true
        }),
        new Webpack.optimize.CommonsChunkPlugin('vendors', '/js/vendors.js')
    ]
};

if(process.env.NODE_ENV == "production"){
    config.output.filename = '/js/main.min.js'
    config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
        compress: {
           warnings: false
        }
    }));
    config.addVendor('react', path.resolve(node_modules_dir, 'react/dist/react.min.js'));

}else{
    config.addVendor('react', path.resolve(node_modules_dir, 'react/dist/react.js'));

}

module.exports = config;