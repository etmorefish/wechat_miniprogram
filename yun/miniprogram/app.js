//app.js
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
      //  env: cloud.DYNAMIC_CURRENT_ENV,
        traceUser: true,
      })
    }

    this.globalData = {}
    // console.log('11111111',globalData)
    // const db = wx.cloud.database({
    //   env: 'xly-31wma',      
    // })
    // db.collection('zhihu_daily')
    //   .get()
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })

  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const db = wx.cloud.database()
    // db.collection('books')
    //   .get()
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
  },
})
