const mongoose = require('mongoose')
//定义一个模型的字段
const Schema = new mongoose.Schema({
  name: {
    type: "string",
  },
  avatar: {
    type: "string",
  },
  title: {
    type: "string",
  },
  // 所属职业 
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 评分
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  // 技能点
  skills: {
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
  },
  // 出装推荐
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 文本
  usageTips: { type: String },
  // 战斗
  battleTips: { type: String },
  // 团战
  tempTips: { type: String },
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})
module.exports = mongoose.model('Hero', Schema)