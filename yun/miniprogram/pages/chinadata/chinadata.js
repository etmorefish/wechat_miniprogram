// pages/chinadata/chinadata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  // 测试zhihu 云函数
  testFunction() {
    wx.cloud.callFunction({
      name: 'zhihu_daily',
      data: {

      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })

        this.setData({
          result: JSON.stringify(res.result)
        })
        console.log("zhihu云函数返回的对象", res)
        console.log("res.result是啥", res.result)
        console.log("JSON.stringify(res.result)是啥", JSON.stringify(res.result))
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [zhihu] 调用失败：', err)
      }
    })
  },

  callChinaData() {
    wx.cloud.callFunction({
      name: 'chinadata',
      success: res => {
        console.log("云函数返回的数据", res.result.data)
      },
      fail: err => {
        console.error('云函数调用失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const cityname = "州"

    const db = wx.cloud.database()  //获取数据库的引用
    const _ = db.command     //获取数据库查询及更新指令
    db.collection("china")  //获取集合china的引用
      // .where({              //查询的条件指令where
        // gdp: _.gt(3000)     //查询筛选条件，gt表示字段需大于指定值。
        // gdp: _.eq(17502.8),
        // city: _.eq("深圳"),
              // province: _.eq("广东"),
              // gdp: _.gt(3000).and(_.lt(10000))
             
    //  gdp: _.gt(3000),
    //  resident_pop:_.gt(500), 
    //   },
    // _.or([{
    //  builtup_area: _.gt(300)}
    //  ]), 

        // city: db.RegExp({
        //   regexp: '州',
        //   options: 'i',
        // })
  // } )
        
//JavaScript原生正则写法
  // .where({
  //           city: /州/i
  //         })

    //  JavaScript调用RegExp对象的构造函数写法
        .where({
          // city: new db.RegExp({
          //   regexp: "京",
          //   options: 'i',
          // })
          city: db.RegExp({
            regexp: `${cityname}`,
            options: 'i',
          })
        })

      .field({             //显示哪些字段
        _id: false,         //默认显示_id，这个隐藏
        city: true,
        province: true,
        gdp: true
      })
      .orderBy('gdp', 'desc')  //排序方式，降序排列
      .skip(0)                 //跳过多少个记录（常用于分页），0表示这里不跳过
      .limit(10)               //限制显示多少条记录，这里为10

      .get()                   //获取根据查询条件筛选后的集合数据  
      .then(res => {
        console.log('chinadata',res.data)
      })
      .catch(err => {
        console.error(err)
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
  onShareAppMessage: function() {

  }
})