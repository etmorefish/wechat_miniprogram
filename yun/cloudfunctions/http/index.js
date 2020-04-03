// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const rp = require('request-promise')
exports.main = async (event, context) => {
  const options = {
    url: 'https://news-at.zhihu.com/api/4/news/latest',
    json: true,
    method: 'GET',
  };
  return await rp(options)
}