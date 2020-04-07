// pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  scanCode:function(event){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        console.log('res',res,res.result);
        wx.cloud.callFunction({
          // 需调用的云函数名
          name: 'bookinfo',
          // 传给云函数的参数
          data: {
         isbn: res.result
          },
          success: res => {
            var bookString = res.result;
            var info = JSON.parse(bookString)
            console.log(info)
            // console.log(JSON.parse(bookString).isbn)

            // console.log(bookString)
            const db = wx.cloud.database()
            const books = db.collection('books')

            db.collection('books').add({
              // data 字段表示需新增的 JSON 数据
              data: info,
              success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                // console.log(res)
              }
            })
            function getdate() {
              var now = new Date(),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
              return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
            }
            console.log(info.isbn)
            var publish_date = getdate()
            console.log(publish_date)
            db.collection('books').where({
              isbn: info.isbn
            }).update({
              data: {
                publish_date: publish_date
              },
              success: function (res) {
                console.log(res)
              }
            })
          },
          fail: err => {
            console.log(err)
          }
 
        })
      },
      fail: function(res) {
        console.log(err);
      }
    })
   

  }
})