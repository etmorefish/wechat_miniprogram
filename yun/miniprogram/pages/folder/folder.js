// pages/folder/folder.js
const db = wx.cloud.database()  //获取数据库的引用
const _ = db.command     //获取数据库查询及更新指令
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    userData: [{
      _id: 'f3db088f5e7a1c750003179f128f665e',
      folders: []
    }],
img: '',
  },

  async checkUser() {
    //获取clouddisk是否有当前用户的数据，注意这里默认带了一个where({_openid:"当前用户的openid"})的条件
    const userData = await db.collection('clouddisk').get()
    console.log("当前用户的数据对象", userData)

    //如果当前用户的数据data数组的长度为0，说明数据库里没有当前用户的数据
    if (userData.data.length === 0) {
      //没有当前用户的数据，那就新建一个数据框架，其中_id和_openid会自动生成
      return await db.collection('clouddisk').add({
        data: {
          //nickName和avatarUrl可以通过getUserInfo来获取，这里不多介绍
          "nickName": "",
          "avatarUrl": "",
          "albums": [],
          "folders": []
        }
      })
    } else {
      this.setData({
        userData
      })
      console.log('用户数据', userData)
    }
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value.name);
    let foldersName = e.detail.value.name
    const folders = this.data.userData.data[0].folders
    folders.push({ foldersName: foldersName, files: [] })
    const _id = this.data.userData.data[0]._id
    db.collection('clouddisk').doc(_id).update({
      data: {
        folders: _.set(folders)
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  // 上传文件到小程序的临时文件
  chooseMessageFile() {
    const files = this.data.files
    wx.chooseMessageFile({
      count: 5,
      success: res => {
        console.log('选择文件之后的res', res)
        let tempFilePaths = res.tempFiles
        for (const tempFilePath of tempFilePaths) {
          files.push({
            src: tempFilePath.path,
            name: tempFilePath.name
          })
        }
        this.setData({ files: files })
        console.log('选择文件之后的files', this.data.files)
      }
    })
  },

  // 将临时文件上传到云存储
  uploadFiles(e) {
    const filePath = this.data.files[0].src
    const cloudPath = `cloudbase/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/\.[^.]+?$/)
    wx.cloud.uploadFile({
      cloudPath, filePath
    }).then(res => {
      console.log("文件上传成功", res)
      this.setData({
        fileID: res.fileID,
      })
    }).catch(error => {
      console.log("文件上传失败", error)
    })
  },
  // 将文件信息存储到数据库
  addFiles(fileID) {
    const name = this.data.files[0].name
    const _id = this.data.userData.data[0]._id
    db.collection('clouddisk').doc(_id).update({
      data: {
        'folders.0.files': _.push({
          "name": name,
          "fileID": fileID
        })
      }
    }).then(result => {
      console.log("写入成功", result)
      wx.navigateBack()
    }
    )
  },

  getFiles() {
    const _id = this.data.userData.data[0]._id
    db.collection("clouddisk").doc(_id).get()
      .then(res => {
        console.log('用户数据', res.data)
      })
      .catch(err => {
        console.error(err)
      })
  },

  getServerImg() {
    wx.cloud.callFunction({
      name: 'downloadimg',
      success: res => {
        console.log("云函数返回的数据", res.result)
        this.setData({
          img: res.result
        })
      },
      fail: err => {
        console.error('云函数调用失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkUser()

    this.getFiles()
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