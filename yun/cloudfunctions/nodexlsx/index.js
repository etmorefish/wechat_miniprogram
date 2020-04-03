const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const xlsx = require('node-xlsx');
const db = cloud.database()

exports.main = async (event, context) => {
  const fileID = 'cloud://xly-31wma.786c-xly-31wma-1301595367/china.csv'
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent

  const tasks = []
  var sheets = xlsx.parse(buffer);
  sheets.forEach(function (sheet) {
    for (var rowId in sheet['data']) {
      console.log(rowId);
      var row = sheet['data'][rowId];
      if (rowId > 0 && row) {
        const promise = db.collection('chinaexcel')
          .add({
            data: {
              city: row[0],
              province: row[1],
              city_area: row[2],
              builtup_area: row[3],
              reg_pop: row[4],
              resident_pop: row[5],
              gdp: row[6]
            }
          })
        tasks.push(promise)
      }
    }
  });

  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function (err) {
    return err
  })
  return result
}