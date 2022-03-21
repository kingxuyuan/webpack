/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-03-20 23:07:23
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-03-21 20:26:58
 * @Description: 
 */
// 下载地址
const URL = {
    ios: 'https://yes.ppttsspp.top/s/wwjX',
    android: 'https://img.beimengkj.com/android/piqiuyuliao_2.0.3_03-17.apk'
}

export const judgeDevice = (): string => {
    let device = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        device = 'iPhone';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        device = 'Android';
    } else { //pc
        device = 'PC';
    }
    return device;
};

export const appDownload = () => {
    let url = judgeDevice() === 'iPhone' ? URL.android : URL.ios;
    location.href = url;
}