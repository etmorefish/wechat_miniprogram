// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/images/user-unlogin.png',
    nickName: "用户未登陆",
    fileList: []
  },
  getUserInfomation: function(event) {
    let {
      avatarUrl,
      city,
      nickName
    } = event.detail.userInfo
    avatarUrl = avatarUrl.split("/")
    avatarUrl[avatarUrl.length - 1] = 0;
    avatarUrl = avatarUrl.join('/');
    this.setData({
      avatarUrl,
      city,
      nickName
    })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('userInfo').where({
      _openid:_.eq(app.globalData.openid)
    }).count({
      success:res => {
        if(res.total == 0){
          db.collection('userInfo').add({
            data: {
              avatarUrl,
              city,
              nickName
            },
            success: res => {
              console.log('添加用户信息成功', res)
            },
            fail: err => {
              console.log('添加用户信息失败', err)
            }
          })
        }else{
          console.log('用户已存在')
        }
      },
      fail:err => {
        console.log('查询用户信息失败', err)
      }
    })
    
    this.onLoad()
  },
  checkUser(event) {
    if (!app.globalData.openid) {
      wx.showToast({
        icon: 'none',
        title: '请登陆后再上传'
      })
      event.detail.callback(false)
    } else {
      event.detail.callback(true)
    }
  },
  previewImg(event) {
    console.log(event)
    let image_index = event.detail
    wx.navigateTo({
      url: "../photo/photo?fileID=" + image_index.url
    })
  },
  deleteToCloud(event) {
    let image_index = event.detail.index
    let fileList_new = this.data.fileList
    wx.showToast({
      icon: 'loading',
      title: '正在删除',
      duration: 3000
    })
    wx.cloud.callFunction({
      name: 'deleteimg',
      data: {
        fileID: fileList_new[image_index].url,
        openid: app.globalData.openid
      },
      success: res => {
        wx.showToast({
          icon: 'success',
          title: '删除成功'
        })
        console.log("图片删除成功", res)
        fileList_new.splice(image_index, 1);
        this.setData({
          fileList: fileList_new
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '请重试'
        })
        console.log("图片删除失败", err)
      }
    })
  },
  uploadToCloud(event) {
    const {
      fileList = []
    } = this.data
    const {
      file
    } = event.detail
    const filePath = file.path
    const cloudPath = `photo/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/\.[^.]+?$/)
    wx.showToast({
      icon: 'loading',
      title: '正在上传',
      duration: 3000
    })
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log("上传文件成功", res)
        fileList.push({
          url: res.fileID,
          isImage: true
        })
        wx.cloud.callFunction({
          name: 'getimgurl',
          data: {
            fileID: res.fileID,
            openid: app.globalData.openid
          },
          success: res => {
            this.setData({
              fileList
            })
            wx.showToast({
              icon: 'success',
              title: '上传成功'
            })
            console.log("上传数据库成功", res)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '请重试'
            })
            console.log("上传数据库失败", err)
          }
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '请重试'
        })
        console.log("上传文件失败", err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          if (!app.globalData.openid) {
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              success: res => {
                console.log(res.result.openid)
                getApp().globalData.openid = res.result.openid
                this.onLoad()
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '请检查登陆状态',
                })
                console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
              }
            })
            return
          }
          wx.getUserInfo({
            success: res => {
              let {
                avatarUrl,
                city,
                nickName
              } = res.userInfo
              this.setData({
                avatarUrl,
                city,
                nickName
              })
            }
          })
          const {
            new_fileList = []
          } = this.data
          wx.cloud.callFunction({
            name: 'getallimg',
            data: {
              openid: app.globalData.openid
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
        } else {
          wx.showToast({
            icon: 'none',
            title: '单击头像即可登陆上传'
          })
        }
      }
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