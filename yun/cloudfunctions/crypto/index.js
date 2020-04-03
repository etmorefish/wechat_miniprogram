const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const crypto = require('crypto');
exports.main = async (event, context) => {
  const hashes = crypto.getHashes(); //获取crypto支持的加密算法种类列表

  //md5 加密 CloudBase2020 返回十六进制
  var md5 = crypto.createHash('md5');
  var message = 'CloudBase2020';
  var digest = md5.update(message, 'utf8').digest('hex');

  return {
    "crypto支持的加密算法种类": hashes,
    "md5加密返回的十六进制": digest
  };
}