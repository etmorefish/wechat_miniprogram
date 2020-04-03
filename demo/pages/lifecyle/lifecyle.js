// pages/lifecyle/lifecyle.js



Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [{
      name: "肖申克的救赎",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp",
      desc: "有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！"
    },
    {
      name: "霸王别姬",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.webp",
      desc: "风华绝代。"
    },
    {
      name: "这个杀手不太冷",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.webp",
      desc: "怪蜀黍和小萝莉不得不说的故事。"
    },
    {
      name: "阿甘正传",
      img: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p510876377.webp",
      desc: "一部美国近现代史。"
    },
    {
      name: "美丽人生",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p510861873.webp",
      desc: "最美的谎言。"
    },
    {
      name: "泰坦尼克号",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p457760035.webp",
      desc: "失去的才是永恒的。"
    },
    {
      name: "千与千寻",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1606727862.webp",
      desc: "最好的宫崎骏，最好的久石让。"
    },
    {
      name: "辛德勒名单",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p492406163.webp",
      desc: "拯救一个人，就是拯救整个世界。"
    },
    ],


  },

  clickImage: function (event) {
    console.log('我是button', event)
    wx.navigateTo({
      url: "/pages/home/detail/detail?id=imageclick&uid=tcb&key=tap&ENV=weapp&frompage=lifecycle"
    })
  },

  clickView: function (event) {
    let jdpid = event.currentTarget.dataset.pid
    let pidurl = "https://item.jd.com/" + jdpid + ".html"
    console.log(pidurl)

    console.log('我是view', event)
    wx.navigateTo({
      url: "/pages/home/detail/detail?id=viewclick&uid=tcb&key=tap&ENV=weapp&frompage=lifecycle"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad监听页面加载", options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow监听页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload监听页面卸载")
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