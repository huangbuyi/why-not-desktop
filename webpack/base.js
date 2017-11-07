var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var SRC_PATH = path.join(__dirname, '../src')

module.exports = {
	context: path.join(__dirname, '../'),
	entry: {
		index: path.join(__dirname, '../src/index.jsx')
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-class-properties']
				}
			}, 'eslint-loader']
		}, {
			test: /\.sass?$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						module: true,
						importLoaders: 1,
						localIdentName: '[name]_[local]_[hash:base64:5]',
						sourceMap: true,
						minimize: true
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			})
		},{
			test: /\.css?$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						localIdentName: '[name]_[local]_[hash:base64:5]',
						sourceMap: true,
						minimize: true
					}
				}]
			})
		},{
			test: /\.(woff|woff2|eot|ttf|otf|svg)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'fonts/[name].[ext]'
				}
			}]
		},{
			test: /\.(jpg|jpeg|png|gif|ttf)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: 'fonts/[name].[ext]'
				}
			}]
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			_system: path.join(SRC_PATH, 'system'),
			_utils: path.join(SRC_PATH, 'utils')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'It Work',
			filename: 'index.html'
		})
	]
}
