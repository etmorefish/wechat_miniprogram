// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = event.openid
  const fileID = event.fileID
  new Promise((resolve, reject) => {
    db.collection("photo").where({
      openid: _.eq(openid)
    }).count().then(res => {
      console.log(res.total)
      if (res.total != 0) {
        console.log("数据更新中")
        db.collection('photo').where({
          openid: _.eq(openid)
        }).update({
          data: {
            files: {
              url: _.push(fileID)
            }
          }
        }).then(res => {
          console.log("数据更新成功", res)
        }).catch(error => {
          console.log("数据更新失败", error)
        })
      } else {
        db.collection('photo').add({
          data: {
            openid: openid,
            avatarUrl: wxContext.,
            city,
            nickName,
            files: {
              url: [fileID]
            }
          }
        }).then(res => {
          console.log("数据添加成功", res)
        }).catch(error => {
          console.log("数据添加失败", error)
        })
      }
    }).catch(error => {
      console.log("数据查询失败", error)
    })
  })
  console.log("云函数执行完成")
  return openid
}