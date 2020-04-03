// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcb = require('tcb-router')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcb({event})

  app.use(async(ctx, next) => {
    console.log('进入全局路由的中间件')
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next();
    console.log('退出全局路由的中间件')
  })

  app.router(['user', 'school'], async(ctx, next) =>{
    console.log('进入数组路由的中间件')
    ctx.data.from = '小程序云函数实战'
    await next();
    console.log('退出数组路由的中间件')
  })

  app.router('user', async(ctx, next) =>{
    console.log('进入用户路由的中间件')
    ctx.data.name = 'lilei'
    ctx.data.role = 'develop'
    await next();
    console.log('退出用户路由的中间件')

  },async (ctx) => {
    console.log('进入用户昵称路由的中间件')
    ctx.data.nickName = 'Bestony'
    ctx.body = {code: 0, data: ctx.data}
    console.log('退出用户昵称路由的中间件')

  })

  app.router('school', async (ctx, next) => {
    ctx.data.name = 'xxml'
    ctx.data.role = 'develop'
    await next();
  }, async (ctx) => {
    ctx.data.nickName = 'Bes'
    ctx.body = { code: 0, data: ctx.data }
  })
  return app.serve();
}