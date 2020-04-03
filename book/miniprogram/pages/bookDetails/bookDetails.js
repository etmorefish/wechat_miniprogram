// pages/bookDetails/bookDetails.js
const db = wx.cloud.database()
const books = db.collection('books')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection('books').doc(options.id).get({
      success: res => {
        console.log(res.data)
        this.setData({
          book: res.data,
          id: options.id
        });
      },
      fail: err => {
        console.error(error)
      }
    })
    //   },
    //   fail: err => {
    //     console.error(error)
    //   }
    // })
    // console.log(options)
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
  onShareAppMessage: function() {

  },

  update: function(event) {
    db.collection('books').doc(this.data.id).update({
      data: {
        title: "局部数据更新测试"
      },
      success: function(res) {
        console.log(res)
      }
    })
  },


  delete: function(event) {
    db.collection('books').doc(this.data.id).remove({
      success: function (res) {
        console.log(res)
      }
    })
  }
})