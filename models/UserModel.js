const mongoose = require('mongoose');
// 1.创建文档的结构对象，设置集合的文档数据的属性和属性值，进而约束属性
let UserSchema = new mongoose.Schema({
  username: String,
  password: String
})
// 2.创建模型对象 对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;