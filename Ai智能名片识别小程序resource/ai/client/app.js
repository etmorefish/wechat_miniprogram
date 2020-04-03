//app.js
App({
  onLaunch: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'xly-31wma',
      traceUser: true
    });
  },
  globalData: {
    namecard: {}
  }
});
