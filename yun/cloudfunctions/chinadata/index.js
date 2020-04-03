// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const _ = db.command
  return await db.collection("china")
    .where({
      province: "湖北"
    })
    .update({
      data: {
        "pro-en": "Hubei"
      },
    })
      // gdp: _.gt(3000)
      // province: "广东"
    // })
    // .remove()
    // .field({
    //   _id: false,
    //   city: true,
    //   province: true,
    //   gdp: true
    // })
    // .orderBy('gdp', 'desc')
    // .skip(0)
    // .limit(10)
    // .get()
}