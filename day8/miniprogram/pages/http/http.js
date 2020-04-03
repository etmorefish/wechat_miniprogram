// pages/http/http.js
const app = getApp()

Page({

  http:function(event){
    wx.cloud.callFunction({
      name:'http'
    }).then( res => {
      // console.log(res.result) // get
      console.log(JSON.parse(res.result)) // post
    }).catch('error')
  }
  
})