module.exports = app => {
    const express = require('express');
    const router = express.Router({
        // 合并url 参数
        mergeParams: true
    });
    //为了后续的crud操作 以为频繁会使用crud 
    // 但是在接口方面会大同小异 为了效率 通过一套接口可以给所有的接口使用
    // 1 模块方法不能写死 根据相应的地址 自动的调用出相应的模块 运用 inflection 包首字母大写以及去复数形式
    //创建列表数据
    // 2 创建一个中间件 使得全局定义一个 更换模块名称 调用模块的方法 挂在app中的时候加载中间件

    router.post('/', async (req, res) => {
        //需要就引入进来 这里的异步请求 是应为node往mogodb传递数据的时候是异步操作 
        //create是创建数据
        // const model = await Category.create(req.body) 这里的引入模块名就要动态化
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //获取列表数据 渲染列表页面
    router.get('/', async (req, res) => {
        const model = await req.Model.find().populate('parent').limit(10)
        res.send(model)
    })
    //根据ID获取列表详情 渲染页面
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //根据ID修改属性名称
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //根据ID删除对应数据
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send(
            { success: true }
        )
    })
    // 将固定的参数地址改为动态拼接的地址

    app.use('/admin/api/rest/:resource', (req, res, next) => {
        const Modelname = require('inflection').classify(req.params.resource)
        // 表示在请求对象中挂载了Model
        req.Model = require(`../../models/${Modelname}`)
        next()
    }, router)
    //  图片上传 因为express本身是获取不到上传文件的数据 所以下载一个包
    const multer = require('multer')
    // 定义一个上传中间件  同时传递一个 dest 目标地址是哪里 single表示单文件上传
    const upload = multer({ dest: __dirname + '../../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:8080/uploads/${file.filename}`
        res.send(file)
    })
} 