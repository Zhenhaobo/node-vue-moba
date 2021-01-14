const mongoose = require('mongoose')
//定义一个模型的字段
const Schema = new mongoose.Schema({
    name: {
        type: "string",
    },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})
module.exports = mongoose.model('Category', Schema)