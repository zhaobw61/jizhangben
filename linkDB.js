// 链接数据库
// 1.安装mongoose
const mongoose = require('mongoose')

// 2.链接服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 设置回调
mongoose.connection.once('open', () => {
  console.log('link success');
  // 1.创建文档的结构对象，设置集合的文档数据的属性和属性值，进而约束属性
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  })
  // 2.创建模型对象 对文档操作的封装对象
  let BookModel = mongoose.model('books', BookSchema);
  BookModel.create({
    name: 'I am Hero',
    author: '',
    price: 19.9,
    is_hot: false
  })
  // 3.字段验证
  let UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: String,
      default: 123
    }
  })

  // 删除文档
  BookModel.deleteOne({_id: '123'}, (err, data) => {
    if(err) {
      console.log('delete error')
      return;
    } 
    console.log(data)
  })

  // 批量删除
  BookModel.deleteMany({is_hot: false}, (err, data) => {
    if(err) {
      console.log('deleteMany error')
      return;
    } 
    console.log(data)
  })

  // 更新
  BookModel.updateOne({name:'boowen'}, {age: 28}, (err, data) => {
    if(err) {
      console.log('error')
    }
    console.log(data)
  })
  // 批量更新
  BookModel.updateMany({name:'boowen'}, {age: 28}, (err, data) => {
    if(err) {
      console.log('error')
    }
    console.log(data)
  })
  // 查询
  BookModel.findOne({name:'boowen'}, {age: 28}, (err, data) => {
    if(err) {
      console.log('error')
    }
    console.log(data)
  })
  // 根据ID去查询
  BookModel.findById({name:'boowen'}, {age: 28}, (err, data) => {
    if(err) {
      console.log('error')
    }
    console.log(data)
  })
  // 批量获取
  BookModel.find({author: 'boowen'}, (err, data) => {
    if(err) {
      console.log('error')
    }
    console.log(data)
  })
})

mongoose.connection.once('error', () => {
  console.log('link error');
})

mongoose.connection.once('close', () => {
  console.log('link close');
})

// 关闭连接
// setTimeout(() => {
//   mongoose.disconnect();
// }, 200);
