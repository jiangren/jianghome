let Koa = require('koa');
let Router = require('koa-router');
let static = require('koa-static');
let path = require('path');

const staticPath = '../client/dist';
let cors = require('koa2-cors');
// 引入modejs的文件系统API
let fs = require('fs');

const app = new Koa();
app.use(static(
    path.join(__dirname, staticPath)
));

const router = new Router();
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/cors') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// 提供一个/getJson接口
router
    .get('/getJson', async ctx => {
        // 后端允许cors跨域请求
        // await cors();
        // 返回给前端的数据
        ctx.body = JSON.parse(fs.readFileSync( './mock/material.json'));
    
    });

// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods());
// 监听3000端口
app.listen(3000);