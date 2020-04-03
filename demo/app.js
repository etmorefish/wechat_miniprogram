//app.js
App({
  onLaunch(opts) {
    console.log('onLaunch监听小程序初始化。', opts)
  },
  onShow(opts) {
    console.log('onShow监听小程序启动或切前台', opts)
  },
  onHide() {
    console.log('onHide监听小程序切后台')
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})


let lesson = "云开发技术训练营";
let enname = "CloudBase Camp"
console.log(lesson.length);  //返回字符串的长度
console.log(lesson[4]);  //返回在指定位置的字符
console.log(lesson.charAt(4));   //返回在指定位置的字符
console.log(lesson.substring(3, 6));  //从索引3开始到6（不包括6）
console.log(lesson.substring(4));  //从索引4开始到结束
console.log(enname.toLowerCase()); //把一个字符串全部变为小写：
console.log(enname.toUpperCase());  //把一个字符串全部变为大写：
console.log(enname.indexOf('oud')); //搜索指定字符串出现的位置：
console.log(enname.concat(lesson)); //连接两个字符串
console.log(lesson.slice(4)); //提取字符串的某个部分，并以新的字符串返回被提取的部分

