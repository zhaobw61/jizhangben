var express = require('express');
var moment = require('moment');
const AccountModel = require('../../models/AccountModel');
var router = express.Router();


// 记账本的列表
router.get('/account', function(req, res, next) {
  AccountModel.find({}, (err, data) => {
    if(err) {
      res.json({
        code: '1001',
        msg: '读取失败',
        data: null
      })
    }
    // res.render('list', {accounts: data, moment: moment})
    res.json({
      // 响应编号
      code: '0000',
      // 响应信息
      msg: '读取成功',
      // 响应数据
      data: data
    })
  })
});

// 添加记录
router.get('/account/create', function(req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account', function(req, res) {
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
      res.json({
        code: '1002',
        msg: '创建失败',
        data: null
      })
    } else {
      res.json({
        code: '0000',
        msg: '创建成功',
        data: data
      })
    }
  })
});

// 删除记录
router.delete('/account/:id', function(req, res, next) {
  let id = req.params.id;
  AccountModel.deleteOne({_id:id}, (err, data) => {
    if(err) {
      res.json({
        code: '1003',
        msg: '删除失败',
        data: null
      })
    }
    console.log('data-', data)
    res.json({
      code: '0000',
      msg: '删除成功',
      data: null
    })
  })
});

// 获取单个账单的信息
router.get('/account/:id', function(req, res, next) {
  let id = req.params.id;
  AccountModel.findById(id, (err, data) => {
    if(err) {
      res.json({
        code: '1003',
        msg: '读取失败',
        data: null
      })
    }
    res.json({
      code: '0000',
      msg: '获取成功',
      data: null
    })
  })
});

// 更新账单
router.patch('/account/:id', function (req, res) {
  let {id} = req.params;
  AccountModel.updateOne({_id: id}, req.body, (err, data) => {
    if(err) {
      res.json({
        code: '1003',
        msg: '更新失败',
        data: null
      })
    }
    // 再次查询数据库
    AccountModel.findById(id, (err, data) => {
      if(err) {
        res.json({
          code: '1003',
          msg: '读取失败',
          data: null
        })
      }
      res.json({
        code: '0000',
        msg: '更新成功',
        data: data
      })
    })
  })
})

module.exports = router;
