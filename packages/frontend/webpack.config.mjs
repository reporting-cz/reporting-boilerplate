import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';
import webpack from 'webpack';
import fs from 'fs';

const packageConfig = JSON.parse(fs.readFileSync('./package.json'));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../.env')});

export default (env, args) => ({
	entry: {
		'app': {import: './src/index.ts', filename: 'bundle.js'},
	},
	mode: args.mode,
	devtool: args.mode == 'development' ? 'eval-source-map' : false,
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: {
				loader: 'ts-loader',
				options: {
					transpileOnly: false,
					projectReferences: true
				}
			}
		}],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	devServer: {
		static: [
			{directory: './dist'},
			{directory: './assets', publicPath: '/assets'}
		],
		hot: true,
		compress: true,
		port: 3000,
		client: {overlay: false},
		proxy: {
			'/api': {
				target: process.env.DOCKER_RUNNING == 'true'
					? 'http://bp-backend:3001'
					: 'http://localhost:3001',
				pathRewrite: { '^/api': '' }
			},
		},
	},
	watchOptions: {
		poll: process.env.DOCKER_RUNNING == 'true' ? 1000 : false,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Reporting',
			template: './src/index.html',
			inject: 'body',
			publicPath: '/'
		}),
		new webpack.DefinePlugin({
			'process.env.PACKAGE_NAME': JSON.stringify(packageConfig.name),
			'process.env.PACKAGE_VERSION': JSON.stringify(packageConfig.version),
			'process.env.MODE': JSON.stringify(args.mode)
		})
	]
});
