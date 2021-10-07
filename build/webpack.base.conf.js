/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-01 15:20:26
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-07 21:36:58
 * @Description: webpack 公共文件配置
 */
const path = require("path");
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pathFn = (url) => {
	return path.resolve(__dirname, url);
};

module.exports = {
	entry: pathFn("../index.ts"),
	output: {
		filename: "main.js",
		path: pathFn("../dist"),
        // assetModuleFilename: 'images/[hash][ext][query]'
	},

	module: {
		rules: [
            {
				test: /\.ts$/,
				use: ["ts-loader"],
				exclude: [pathFn("../node_modules")],
			}, {
				test: /\.(sa|sc|c)ss$/,
				use: [
                    "style-loader",
					"css-loader",
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							// data   prependData   additionalData
							additionalData: `@import  "/src/assets/style/global.scss";`,
						},
					},
				],
			}, {
                test: /\.(png|gif|jpg|svg|jpeg)$/i,
                type: 'asset/resource',
                //解析 转base64的条件
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    }
                },
                generator:{ 
                    //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
                    filename: 'images/[hash][ext][query]',
                },
            },  {   // 处理多媒体文件
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'video/'
                },
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                // options: {
                //     attrs: ['img:src', 'img:data-src', 'audio:src', 'video:src'],
                //     minimize: false,
                //     removeComments: true,
                //     collapseWhitespace: false,
                // },
            }
		],
	},
    
	plugins: [
        new WebpackBar(),
        // 与 html-loader 冲突，title 失效
		new HtmlWebpackPlugin({
            title: 'webpack test',
			filename: "index.html",
			template: pathFn("../index.html"),
		}),
	]
};
