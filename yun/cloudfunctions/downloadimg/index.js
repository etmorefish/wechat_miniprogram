const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  const fileID = 'cloud://xly-31wma.786c-xly-31wma-1301595367/1585016789752-105.jpeg'
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent
  return buffer.toString('base64')
}