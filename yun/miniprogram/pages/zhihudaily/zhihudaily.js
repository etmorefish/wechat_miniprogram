// pages/zhihudaily/zhihudaily.js
const db = wx.cloud.database()  //获取数据库的引用
const _ = db.command     //获取数据库查询及更新指令
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addDaily() {
    // const db = wx.cloud.database()  //获取数据库的引用
    // const _ = db.command     //获取数据库查询及更新指令
    db.collection('zhihu_daily').add({
      data: {
        _id: "daily9718005",
        title: "元素，生生不息的宇宙诸子",
        images: [
          "https://pic4.zhimg.com/v2-3c5d866701650615f50ff4016b2f521b.jpg"
        ],
        id: 9718005,
        url: "https://daily.zhihu.com/story/9718005",
        image: "https://pic2.zhimg.com/v2-c6a33965175cf81a1b6e2d0af633490d.jpg",
        share_url: "http://daily.zhihu.com/story/9718005",
        body: "<p><strong><strong>谨以此文，纪念元素周期表发布 150 周年。</strong></strong></p>\r\n<p>地球，世界，和生活在这里的芸芸众生从何而来，这是每个人都曾有意无意思考过的问题。</p>\r\n<p>科幻小说家道格拉斯·亚当斯给了一个无厘头的答案，42；宗教也给出了诸神创世的虚构场景；</p>\r\n<p>最为恢弘的画面，则是由科学给出的，另一个意义上的<strong>生死轮回，一场属于元素的生死轮回</strong>。</p>"
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(console.error)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    db.collection('zhihu_daily').doc("daily9718005")
      .get()
      .then(res => {
        console.log('单个记录的值', res.data)
      })
      .catch(err => {
        console.error(err)
      })
  },

  removeDaily() {
    // const db = wx.cloud.database()  //获取数据库的引用
    // const _ = db.command     //获取数据库查询及更新指令
    db.collection('zhihu_daily').doc("daily9718005")
      .remove()
      .then(console.log('delete'))
      .catch(console.error)
  },
  updateDaily() {
    db.collection('zhihu_daily').doc("daily9718005")
      .update({
        data: {
          title: "【知乎日报】元素，生生不息的宇宙诸子",
        }
      })
      .then(console.log('update'))
      .catch(console.error)
  },
  setDaily() {
    db.collection('zhihu_daily').doc("daily9718005")
      .set({
        data: {
          "title": "为什么狗会如此亲近人类?",
          "images": [
            "https://pic4.zhimg.com/v2-4cab2fbf4fe9d487910a6f2c54ab3ed3.jpg"
          ],
          "id": 9717547,
          "url": "https://daily.zhihu.com/story/9717547",
          "image": "https://pic4.zhimg.com/v2-60f220ee6c5bf035d0eaf2dd4736342b.jpg",
          "share_url": "http://daily.zhihu.com/story/9717547",
          "body": "<p>让狗从凶猛的野兽变成忠实的爱宠，涉及了宏观与微观上的两层故事：我们如何在宏观上驯养了它们，以及这些驯养在生理层面究竟意味着什么。</p>\r\n<p><img class=\"content-image\" src=\"http://pic1.zhimg.com/70/v2-4147c4b02bf97e95d8a9f00727d4c184_b.jpg\" alt=\"\"></p>\r\n<p>狗是灰狼（Canis lupus）被人类驯养后形成的亚种，至少可以追溯到 1 万多年以前，是人类成功驯化的第一种动物。在这漫长的岁月里，人类的定向选择强烈改变了这个驯化亚种的基因频率，使它呈现出极高的多样性，尤其体现在生理形态上。</p>"
        }
      })
      .then(console.log('set'))
      .catch(console.error)
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