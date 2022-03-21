/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-01 15:56:24
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-03-21 22:34:22
 * @Description: webpack 生成配置
 */
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const WebpackBaseConfig = require("./webpack.base.conf");

module.exports = merge(WebpackBaseConfig, {
	mode: "production",
	output: {
		filename: "js/[name][contenthash].js",
		chunkFilename: "js/[name][contenthash].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							// additionalData: `@import  "/src/assets/style/global.scss";`,
						},
					},
				],
			},
		],
	},
	optimization: {
		emitOnErrors: true, //  在编译时每当有错误时，就会 emit asset
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {
						drop_console: true,
						drop_debugger: false,
						pure_funcs: ["console.log"], // 移除console
					},
					//删除注释
					output: {
						comments: false,
					},
				},
			}),
		],
		// 分离chunks
		splitChunks: {
			chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
			maxInitialRequests: 10,
			cacheGroups: {
				dayjs: {
					name: "dayjs", // 单独将 dayjs 拆包
					priority: 15,
					test: /[\\/]node_modules[\\/]dayjs[\\/]/,
					filename: "js/[name].[contenthash].js",
				},
				vendors: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: "initial", // 只打包初始时依赖的第三方
				},
			},
		},
		// runtimeChunk: {
		// 	name: "runtime",
		// },
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},

	plugins: [
		// 预加载
		new PreloadWebpackPlugin({
			rel: "preload",
            excludeHtmlNames: ['pc.html'],
            include: ['h5']
		}),
        new PreloadWebpackPlugin({
		    rel: 'prefetch',
            excludeHtmlNames: ['pc.html'],
            include: ['h5']
		}),
        // 加载将来页面肯能需要的资源
        new PreloadWebpackPlugin({
		    rel: 'preload',
            excludeHtmlNames: ['h5.html'],
            include: ['pc']
		}),
        new PreloadWebpackPlugin({
		    rel: 'prefetch',
            excludeHtmlNames: ['h5.html'],
            include: ['pc']
		}),

		// css 文件分离
		new MiniCssExtractPlugin({
			filename: "css/[name][contenthash].css",
			chunkFilename: "css/[name][contenthash].css",
		}),
		new CssMinimizerPlugin(),
		new UglifyWebpackPlugin({
			cache: true, // 开启缓存
			parallel: true, // 允许并发
			sourceMap: false, // set to true if you want JS source maps
		}),
	],
});
