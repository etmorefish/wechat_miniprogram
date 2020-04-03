// 云函数入口文件
const cloud = require('wx-server-sdk')
const moment = require("moment");


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
// 云函数入口函数
exports.main = async (event, context) => {
  moment.locale('zh-cn');
  time1 = moment().format('MMMM Do YYYY, h:mm:ss a');
  time2 = moment().startOf('hour').fromNow();
  return { time1, time2 }
}