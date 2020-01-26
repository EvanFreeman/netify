/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, {mode} = {}) => ({
	mode,
	entry: './src/panel.ts',
	output: {
		publicPath: '/',
		filename: 'panel.js',
		path: path.resolve(__dirname, 'build'),
	},
	stats: {
		all: false,
		builtAt: true,
		errors: true,
		warnings: true,
		performance: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					onlyCompileBundledFiles: true,
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[name]__[local]-[hash:base64:5]',
							},
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.svg$/,
				loader: 'svg-react-loader',
				options: {
					name: 'Icon',
				},
			},
			{
				test: /\.png$/,
				loader: 'file-loader',
				options: {
					name: 'icons/[hash:hex:8].[ext]',
				},
			},
		],
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
			filename: 'panel.html',
		}),
		new CopyWebpackPlugin([
			'src/manifest.json',
			'src/devtool.html',
			'src/devtool.js',
			{from: 'src/style/icons', to: 'icons'},
		]),
	],
	watch: mode === 'development',
	devtool: mode === 'development' ? 'inline-source-map' : 'source-map',
});
