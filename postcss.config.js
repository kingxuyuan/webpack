/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-07 14:53:50
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-08 17:04:38
 * @Description: postcss 配置
 */
module.exports = {
	plugins: [
		require("autoprefixer"),
		require("postcss-pxtorem")({
			// rootValue({ file }) {
			// 	return file.indexOf("vant") !== -1 ? 37.5 : 75; //设计稿按照750计算
			// },
            rootValue: 37.5, //默认根目录字体大小(px)
            unitPrecision: 6, //保留小数位
            // selectorBlackList: [''], //过滤的类名
            replace: true, //默认直接替换属性
            mediaQuery: false,
            minPixelValue: 1, //所有小于设置的样式都不被转换
			propList: ["*"],
		}),
	],
};
