const mongoose = require('mongoose')
//定义一个模型的字段
const Schema = new mongoose.Schema({
  name: {
    type: "string",
  },
  icon: {
    type: "string",
  }
})
module.exports = mongoose.model('Item', Schema)