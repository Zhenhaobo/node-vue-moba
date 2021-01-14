const express = require('express')
const app = express()
app.use(express.json())
app.use(require('cors')())
// 引用过来 执行这个函数 同时传递参数app给它 就可以在那里使用app
require('./routes/admin')(app)
require('./plugins/db.js')(app)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.get('/', (req, res) => {
    res.send('ffff')
})
app.listen(8080, () => {
    console.log('http://localhost:8080')
}) 