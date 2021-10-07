/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-01 15:56:23
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-07 21:38:50
 * @Description: webpack 开发环境配置
 */
const path = require("path");
const { merge } = require("webpack-merge");
const WebpackBaseConfig = require("./webpack.base.conf");

const WebpackDevConfig = {
	mode: "development",
	devtool: "eval-cheap-module-source-map",
	output: {
		filename: "[name].js",
		chunkFilename: "[name].js",
	},
	devServer: {
		open: true,
		port: 3000,
		proxy: {
			"/api": {
				target: "",
				changeOrigin: true,
				logLevel: "debug",
				headers: {
					Cookie: "",
				},
				pathRewrite: {
					"^": "",
				},
			},
		},
	},
};

module.exports = merge(WebpackBaseConfig, WebpackDevConfig);
