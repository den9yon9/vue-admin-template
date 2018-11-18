const CryptoJS = require('crypto-js');  //引用AES源码js
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

function leftPad(arg) {
  arg = arg.toString()
  return arg[1] ? arg : '0' + arg
}
const util = {
  install(Vue) {
    Vue.prototype.$util = {
      timeFormat(date, format) {
        let year = date.getFullYear()
        let month = leftPad(date.getMonth() + 1)
        let day = leftPad(date.getDate())

        let hours = leftPad(date.getHours())
        let minute = leftPad(date.getMinutes())
        let second = leftPad(date.getSeconds())

        if (format == 'date' || !format) {
          // xxxx-xx-xx
          return `${year}-${month}-${day}`
        } else if (format == 'time') {
          // xx:xx:xx
          return `${hours}:${minute}:${second}`
        } else if (format == 'full') {
          // xxxx-xx-xx xx:xx:xx
          return `${year}-${month}-${day} ${hours}:${minute}:${second}`
        }
      },

      ms2Hour(ms) {
        let seconds = parseInt(ms / 1000)
        let minutes = parseInt(seconds / 60)
        let hours = parseInt(minutes / 60)

        let second = (seconds % 60 + '')[1] ? seconds % 60 : '0' + seconds % 60
        let minute = (minutes % 60 + '')[1] ? minutes % 60 : '0' + minutes % 60

        return `${hours}:${minute}:${second}`
      },

      // 加密方法
      Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word); //转为128bit的AES-128加密方式
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext); //Base64加密
      },

      // 解密方法
      Decrypt(word) {
        let baseResult = CryptoJS.enc.Base64.parse(word).toString(); // Base64解密
        let encryptedHexStr = CryptoJS.enc.Hex.parse(baseResult);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
      }

    }
  }
}

export default util
