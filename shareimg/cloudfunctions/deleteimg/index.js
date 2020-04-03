// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const openid = event.openid
  const fileID = event.fileID
  const db = cloud.database()
  const _ = db.command
  await cloud.deleteFile({
    fileList: [fileID]
  }).then(res => {
    console.log("文件删除成功", res)
  }).catch(err => {
    console.log("文件删除失败", err)
  })

  await db.collection('photo').where({
    openid: _.eq(openid)
  }).update({
    data: {
      files: {
        url: _.pull(fileID)
      }
    }
  }).then(res => {
    console.log("数据删除成功", res)
  }).catch(err => {
    console.log("数据删除失败", err)
  })

  return true
}