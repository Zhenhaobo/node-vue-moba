module.exports = app => {
    //引用 连接mogodb的包 mongoose
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/node-vue-moba',
        { useUnifiedTopology: true, useNewUrlParser: true }, err => {
            if (err) {
                console.log(err);
                console.log('数据库连接失败');
                return
            }
            console.log('数据库连接成功');
        });
} 