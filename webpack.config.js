const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, {mode} = {}) => ({
	entry: './src/index.ts',
	output: {
		publicPath: '/',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			use: [{
				loader: 'style-loader',
			}, {
				loader: 'css-loader',
				options: {
					modules: true,
					localIdentName: '[name]__[local]-[hash:base64:5]',
				},
			}],
		}, {
			test: /\.svg$/,
			loader: 'file-loader',
			options: {
				name: 'icons/[name]-[hash:hex:8].[ext]',
			},
		}],
	},
	resolve: {
		alias: {
			'@': path.resolve('src'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/panel.html',
		}),
		...(mode === 'development' ? [
			new webpack.HotModuleReplacementPlugin()
		] : []),
	],
	devtool: mode === 'development' ? 'inline-source-map' : 'source-map',
	devServer: {
		port: 8080,
		hot: true,
		inline: true,
		stats: 'minimal',
		overlay: true,
	},
});
