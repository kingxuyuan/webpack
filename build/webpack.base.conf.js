/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-01 15:20:26
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-03-21 21:57:37
 * @Description: webpack 公共文件配置
 */
const glob = require('glob')
const path = require("path");
const { DefinePlugin } = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pathFn = (url) => path.resolve(__dirname, url);
const global = require("./config");

// 多页面打包
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];                      
    const entryFiles = glob.sync(path.join(__dirname, '../src/page/*/index.ts'))

    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/page\/(.*)\/index\.ts/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: pathFn(`../src/page/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                // vendor 是指提取涉及 node_modules 中的公共模块；
                // manifest 是对 vendor 模块做的缓存
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        );
    });
    
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
	entry,
	output: {
		path: pathFn("../dist"),
		filename: "js/[name].[chunkhash:8].js",
		chunkFilename: "js/[name].[chunkhash:8].js",
		// assetModuleFilename: 'images/[hash][ext][query]'
	},

	module: {
		rules: [
			{
				//test 指定的是规则生效的文件
				test:/\.ts$/,
				//要使用的loader
				use:'ts-loader',
				//要排除的文件
				exclude:/node-modeules/
			},
			{
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
							// additionalData: `@import  "/src/assets/style/global.scss";`,
						},
					},
				],
			},
			{
				test: /\.(png|gif|jpg|svg|jpeg)$/i,
				type: "asset/resource",
				//解析 转base64的条件
				parser: {
					dataUrlCondition: {
						maxSize: 25 * 1024, // 25kb
					},
				},
				generator: {
					//与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
					filename: "images/[hash][ext][query]",
				},
			},
			{
				// 处理多媒体文件
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "[name].[hash:7].[ext]",
					outputPath: "video/",
				},
			},
			{
				test: /\.html$/,
				loader: "html-loader",
				// options: {
				//     attrs: ['img:src', 'img:data-src', 'audio:src', 'video:src'],
				//     minimize: false,
				//     removeComments: true,
				//     collapseWhitespace: false,
				// },
			},
		],
	},
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

	plugins: [
		new WebpackBar(),
		// 与 html-loader 冲突，title 失效
		// new HtmlWebpackPlugin({
		// 	filename: "h5.html",
		// 	template: pathFn("../public/h5.html"),
		// 	inject: "body",
		// 	minify: {
		// 		// 移除空格
		// 		collapseWhitespace: true,
		// 		// 移除注释
		// 		removeComments: true,
		// 	},
		// 	chunks: ["manifest", "vendor", "h5"],
		// }),

		new DefinePlugin({
			global: JSON.stringify(global),
		}),
	].concat(htmlWebpackPlugins),
};
