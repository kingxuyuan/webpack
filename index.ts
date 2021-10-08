/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-01 15:22:42
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-08 15:02:45
 * @Description: 入口文件
 */
import moment from 'moment';
import './src/assets/style/index.scss';

const load = () => {
    console.log(global);
    console.log(moment().format('YYYY-MM-DD HH:ss:mm'));
}
load();