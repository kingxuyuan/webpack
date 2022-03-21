/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-03-20 22:11:20
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-03-21 20:28:08
 * @Description: 
 */
import './index.scss';
import { appDownload } from '../../common';

$(function () {
    $('.download, .btn').click(function () {
        appDownload();
    })
});