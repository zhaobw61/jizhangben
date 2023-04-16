// 模块化
module.exports = function (success, error) {
  if(typeof error !== 'fucntion') {
    error = () => {
      console.log('link fail')
    }
  }
  // 链接数据库
  // 1.安装mongoose
  const mongoose = require('mongoose')
  // 导入配置文件
  const { DBHOST, DBPORT, DBNAME } = require('../config/config.js')

  // 2.链接服务
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

  // 设置回调
  mongoose.connection.once('open', () => {
    success()
  })

  mongoose.connection.once('error', () => {
    console.log('link error');
    error()
  })

  mongoose.connection.once('close', () => {
    console.log('link close');
  })

  // 关闭连接
  // setTimeout(() => {
  //   mongoose.disconnect();
  // }, 200);

}
