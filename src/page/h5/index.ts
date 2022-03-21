/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-01 15:22:42
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-03-21 20:27:38
 * @Description: 入口文件
 */
// import dayjs from 'dayjs';
import './index.scss';
import { appDownload } from '../../common';

$(function () {
    $('.download, .btns').click(function () {
        appDownload();
    });
});