var express = require('express');
var moment = require('moment');
const AccountModel = require('../models/AccountModel');
var router = express.Router();
const checkLoginMiddleware = require('../middlewares/checkLoginMiddleware')



// 记账本的列表
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  AccountModel.find({}, (err, data) => {
    if(err) {
      res.status(500).send('get data fail')
    }
    res.render('list', {accounts: data, moment: moment})
  })
});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account', checkLoginMiddleware, function(req, res) {
  // 获取请求体的数据
  console.log(req.body)
  console.log(moment(req.body.time))
  let body = req.body;
  AccountModel.create({
    title: body.title,
    time: moment(body.time).toDate(),
    type: body.type,
    account: body.account,
    remarks: body.remarks
  }, (err, data) => {
    if(err) {
      res.status(500).send('新增 失败');
      return false;
    } else {
      res.send('新增记录');
      return false;
    }
  })
});

// 删除记录
router.get('/account/:id', checkLoginMiddleware, function(req, res, next) {
  let id = req.params.id;
  AccountModel.deleteOne({_id:id}, (err, data) => {
    if(err) {
      res.render('delete faile')
    }
    console.log('data-', data)
    res.send('delete success')
  })
});

module.exports = router;
