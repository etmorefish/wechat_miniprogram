// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  const fileID = event.fileID
  const openid = event.openid
  const buffer = await cloud.openapi.wxacode.getUnlimited({
    scene:'id=1'
  })
  return await cloud.uploadFile({
    cloudPath: `acode/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}.jpg`,
    fileContent: buffer.buffer
  })
}