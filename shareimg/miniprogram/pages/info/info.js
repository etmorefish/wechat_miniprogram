// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: []
  },

  previewImg(event) {
    console.log(event)
    let image_index = event.detail
    wx.navigateTo({
      url: "../photo/photo?fileID=" + image_index.url + "&openid=" + this.data.openid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      options.openid = options.id
    }
    this.setData({ openid: options.openid })
    const db = wx.cloud.database()
    const _ = db.command
    const {
      new_fileList = []
    } = this.data
    db.collection('userInfo').where({
      _openid: _.eq(options.openid)
    }).get({
      success: res => {
        console.log('获取用户信息成功', res)
        let {
          avatarUrl,
          city,
          nickName
        } = res.data[0]
        this.setData({
          avatarUrl,
          city,
          nickName,
          openid: options.openid
        })
      },
      fail: err => {
        console.log('获取用户信息失败',err)
      }
    })
    wx.cloud.callFunction({
      name: 'getallimg',
      data: {
        openid: options.openid
      },
      success: res => {
        if (res.result.data != '') {
          let urls = res.result.data[0].files.url
          urls.forEach((item, index, urls) => {
            new_fileList.push({
              url: item,
              isImage: true
            })
          })
          this.setData({
            fileList: new_fileList
          })
          console.log("获取用户图片成功", res)
        } else {
          console.log("获取用户图片为空", res)
        }

      },
      fail: err => {
        console.log("获取用户图片失败", err)
      }
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