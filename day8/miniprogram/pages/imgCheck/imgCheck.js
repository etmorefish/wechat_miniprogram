// pages/imgCheck/imgCheck.js
Page({

  imgCheck: function(event){
    wx.cloud.callFunction({
      name: "imgCheck",
      data:{
        img: 'cloud://xly-31wma.786c-xly-31wma-1301595367/1585016789752-105.jpeg'
      }
    }).then(res => {
      console.log('imgCheck',res.result)
    })
  }

})