// pages/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/images/user-unlogin.png',
    nickName: "用户未登陆",
    city: "未知",
    imgurl: "",
    openid:"****",
  },

  getUserInfomation: function (event) {
    console.log('getUserInfomation打印的事件对象', event)
    let { avatarUrl, city, nickName } = event.detail.userInfo
    avatarUrl = avatarUrl.split("/")
    avatarUrl[avatarUrl.length - 1] = 0;
    avatarUrl = avatarUrl.join('/'); 
 
    // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {
  //       openid:"",
  //     },
  //     openid = res.result.openid,
  //     success: res => {
  //       console.log('调用login云函数返回的res', res)
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
        
  //       console.log(openid)
  //     },
      
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //     }
  //   })
    this.setData({
      avatarUrl, city, nickName
    })
  },

  chooseImg: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const filePath = res.tempFilePaths[0]
        const cloudPath = `cloudbase/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('上传成功后获得的res：', res)
            const imgurl = res.fileID
            this.setData({
              imgurl
            })
          },
        })
        console.log(res)
        console.log(res.tempFilePaths)
      }
    })

  },

  uploadimg() {
    wx.cloud.callFunction({
      name: 'uploadimg',
      success: res => {
        console.log('云函数上传图片',res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({
      env: 'xly-31wma'
    })
    db.collection('zhihu_daily')
      .get()
      .then(res => {
        console.log('知乎日报',res.data)
      })
      .catch(err => {
        console.error(err)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})