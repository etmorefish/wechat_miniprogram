// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const wxContext = cloud.getWXContext()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.openid)
  const openid = await event.openid ? event.openid:wxContext.OPENID
  
  return await db.collection("photo").where({
    openid: _.eq(openid)
  }).field({
    files: true,
    _id: false
  }).get()
}