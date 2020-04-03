// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got'); 

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})


// 云函数入口函数
exports.main = async (event, context) => {
  let getResponse = await got('httpbin.org/get')
  // return getResponse.body
  let postResponse = await got('httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'title test',
      value: 'value test'
    })
  })

  return postResponse.body
}






// const rp = require('request-promise')
// exports.main = async (event, context) => {
//   const options = {
//     url: 'https://news-at.zhihu.com/api/4/news/latest',
//     json: true,
//     method: 'GET',
//   };
//   return await rp(options)
// }