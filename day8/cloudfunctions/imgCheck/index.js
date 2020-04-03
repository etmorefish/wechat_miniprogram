// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
try{
  const res = cloud.openapi.security.imgSecCheck({
    // media: event.media
    media: {
      contentType: 'image/png',
      // value: Buffer,
      value: Buffer.from(event.img)
    }
  })
  return res;
} catch (err) {
  return err;
}
}