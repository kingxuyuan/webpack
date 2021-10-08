/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-08 14:56:23
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-08 14:58:10
 * @Description: 
 */
const keys = JSON.parse(process.env.npm_config_argv).original[1];

module.exports = {
    global: keys
}