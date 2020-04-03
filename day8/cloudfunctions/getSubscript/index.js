// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
let appid = 'wx502c420faa024292';
let secret = '27138936d49c8ce9c977b51cfccae333';
let token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
let touser = 'oAfPr0DGqh9DzQepM6uogzk4TaV4'
let msg_url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token='
let template_id = 'lXuKxx0mGcdaMjCnYe4OpAF0IqSgKRI337HBw-Teeuw'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
try {
  let tokenResponse = await got(token_url)
  let token = JSON.parse(tokenResponse.body).access_token
  // let msgResponse = await got(msg_url + token, {
  const msgResponse = await cloud.openapi.subscribeMessage.send(msg_url + token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      touser: touser,
      template_id: template_id,
      data: {
        phrase1: {
          value: '签到ok'
        },
        data4: {
          value: '2022年01月05日 12:30'
        },
        thing5: {
          value: 'hhhhh'
        },
        phrase6: {
          value: '活动'
        }
      }


    })

  })
  // console.log(cloud.getWXContext().OPENID)
  // const result = await cloud.openapi.subscribeMessage.send({
  // touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
  //   // page: 'pages/index',
  //   data: {
  //     phrase1: {
  //       value: '签到ok'
  //     },
  //     // number3: {
  //     //   value: 77
  //     // },
  //     data4: {
  //       value: '2015年01月05日 12:30'
  //     },
  //     thing5: {
  //       value: 'hhhhh'
  //     },
  //     phrase6: {
  //       value: '活动'
  //     }
  //   },
  //   emphasisKeyword: 'phrase6.DATA',
  //   miniprogramState: 'developer'
  // })
  // result 结构
  // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
  return msgResponse
} catch (err) {
  // 错误处理
  // err.errCode !== 0
  return {
    errcode: err.errCode
  }
}