// pages/template/template.js
Page({

  onSubmit: function(event) {
    console.log(event.detail.formId)
    // wx.setClipboardData({
    //   data: event.detail.formId,
    // })
  },
  getSubscript: function(event) {
    console.log('getSubscript')
    wx.requestSubscribeMessage({
      tmplIds: ['lXuKxx0mGcdaMjCnYe4OpAF0IqSgKRI337HBw-Teeuw'],
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  }

})