var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');

// 注册 页面
router.get('/reg', (req, res) => {
  // 响应 HTML 内容
  res.render('reg')
})

router.post('/reg', (req, res) => {
  console.log(req.body)
  UserModel.create({...req.body}, (err, data) => {
    if(err) {
      res.send('fail')
    }
    res.send('ok!!')
  })
})

// 登录 页面
router.get('/login', (req, res) => {
  // 响应 HTML 内容
  res.render('login')
})

router.post('/login', (req, res) => {
  // 响应 HTML 内容
  // res.send('500');
  let { username, password } = req.body;
  UserModel.findOne({ username: username, password: password }, (err, data) => {
    if(err) {
      res.send('账号 密码错误')
    }
    console.log('data', data)
    req.session.usename = data.username;
    req.session._id = data._id;
    res.redirect('/account')
  })
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('logout success')
  })
})
module.exports = router

