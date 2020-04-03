// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: {}
  },
  shareImg: function(){
    wx.cloud.callFunction({
      name:"getacode",
      data:{
        fileID: this.data.fileID,
        openid: this.data.openid
      },
      success:res => {
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            // get temp file path
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: res => {
                console.log('保存成功', res)
              },
              fail: err => {
                console.log('保存失败', err)
              }
            })
          },
          fail: err => {
            // handle error
          }
        })
        console.log(res)
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  downImg: function() {
    wx.cloud.downloadFile({
      fileID: this.data.fileID,
      success: res => {
        // get temp file path
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            console.log('保存成功', res)
          },
          fail: err => {
            console.log('保存失败', err)
          }
        })
      },
      fail: err => {
        // handle error
      }
    })
  },
  getImgUrl: function() {
    wx.cloud.getTempFileURL({
      fileList: [this.data.fileID],
      success: res => {
        wx.setClipboardData({
          data: res.fileList[0].tempFileURL,
          success: res => {
            console.log(res) // data
          }
        })
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  previewImg: function() {
    wx.previewImage({
      current: this.data.fileID, // 当前显示图片的http链接
      urls: [this.data.fileID] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      fileID: options.fileID,
      openid: options.openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let fileID = this.data.fileID
    return {
      title: '我发现了一张好照片',
      path: '/pages/photo/photo?fileID=' + fileID,
    }
  }
})