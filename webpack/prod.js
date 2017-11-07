var merge = require('webpack-merge')
var UngilfyJSPlugin = require('uglifyjs-webpack-plugin')
var config = require('./base')

module.exports = merge(config, {
	devtool: 'source-map',
	plugins: [
		new UngilfyJSPlugin({
			sourceMap: true
		})
	]
})