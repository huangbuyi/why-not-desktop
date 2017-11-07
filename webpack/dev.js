var path = require('path')
var merge = require('webpack-merge')
var config = require('./base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = 'development'

module.exports = merge(config, {
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'js/[name].js',
		publicPath: '/build'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './build'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'css/[name].css'
		})
	]
})
