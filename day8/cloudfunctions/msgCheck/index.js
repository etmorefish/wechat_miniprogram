// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
let appid = 'wx502c420faa024292';
let secret = '27138936d49c8ce9c977b51cfccae333';

let msgCheckUrl = 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='
let tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const res = await cloud.openapi.security.msgSecCheck({
      content: event.text
    })
    return res;
  } catch (err) {
    return err;
  }

  // let tokenResponse = await got(tokenUrl)
  // let token = JSON.parse(tokenResponse.body).access_token
  // let checkResponse = await got(msgCheckUrl + token, {
  //   body: JSON.stringify({
  //     content: event.text
  //   })
  // });
  // return token
    // return checkResponse.body

  // try {
  //   let checkResponse = await cloud.openapi.security.msgSecCheck({
  //     content: text
  //   });
  //   console.log(checkResponse)
  //   return checkResponse.body
  //   }catch(err){
  //   return { 'errCode': err.errCode, 'errMsg': err.errMsg }
  //   }

}