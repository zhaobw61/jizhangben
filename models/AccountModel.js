const mongoose = require('mongoose');
// 1.创建文档的结构对象，设置集合的文档数据的属性和属性值，进而约束属性
let AccountSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true
  },
  // 时间
  time: Date,
  // 类型
  type: {
    type: Number,
    default: -1
  },
  // 金额
  account: {
    type: Number,
    required: true
  },
  // 备注
  remarks: {
    type: String
  }
})
// 2.创建模型对象 对文档操作的封装对象
let AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;