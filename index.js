const Koa = require('./lib/koa');
const Router = require('./lib/koa-router');
const serve = require('./lib/koa-static');

const app = new Koa();
const router = new Router();

// 中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    console.log(`请求${ctx.url}耗时${end - start}ms`)
})

// 配置静态文件服务
app.use(serve(__dirname + '/static'));

// 设置路由
router.get('/', async ctx => {
    ctx.body = 'HelloWorld';
})

router.get('/about', async ctx => {
    ctx.body = {
        name: 'OUDUIDUI',
        age: 18
    };
})

// 配置路由
app.use(router.routes());

// 开启端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`miniKoa Listen ${PORT}`)
})
