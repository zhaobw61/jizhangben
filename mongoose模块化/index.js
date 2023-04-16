const db = require('./db/db');

const mongoose = require('mongoose');

const BookModel = require('./models/BookModel');

db(() => {
  BookModel.create({
    name: 'I am Hero',
    author: '',
    price: 19.9,
    is_hot: false
  })
}, () => {
  console.log('link fail')
})