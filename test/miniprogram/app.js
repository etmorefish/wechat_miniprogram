// //app.js
// App({
//   onLaunch: function () {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'xly-31wma',
        traceUser: true,
      })
    }
    
    wx.login({
      success(res) {
        console.log('wx.login得到的数据', res)
      }
    })

    let that = this
   //为了便于你找位置

    wx.getSetting({
      
      success(res) {
        console.log('wx.getSetting得到的数据', res)
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: res => {
              console.log('that是啥', that)
              console.log("wx.getUserInfo得到的数据", res)
              that.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
  },

  getUserInfomation: function (event) {
    console.log('getUserInfomation打印的事件对象', event)
    app.globalData.userInfo = event.detail.userInfo
    this.setData({
      userInfo: event.detail.userInfo,
    })
  },

  globalData: {
    userInfo: null,
    title: "云开发训练营",
    year: 2019,
    company: "腾讯Tencent",
    juheKey:"d68ed793a10607f864d31744f986e8d6",   // 聚合API
    heweatherKey: "934dad10f5d04398a7878b6a9ebd0d02", //和风天气key
    // 腾讯地图LBS
    mapKey: "YJNBZ-CVGCW-BSERJ-RRW2B-LQA3V-2FF52",//你的key
    mapSecretKey: "N7KlkF06x4n000RZumuuWnRGGeQYuh3d", //你的Secret key
  }
})