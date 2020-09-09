const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const app = new Koa();
const router = new Router();
const VueServerRender = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');

const ServerBundle = require('./dist/vue-ssr-server-bundle');
const clientManifest = require('./dist/vue-ssr-client-manifest')

const template = fs.readFileSync('./dist/index.ssr.html','utf8');

let render = VueServerRender.createBundleRenderer(ServerBundle,{
    template,
    clientManifest
});
router.get('/',async ctx =>{
    ctx.body = await new Promise((resolve,rej)=>{
        render.renderToString({url:'/'},(err,data)=>{
            if(err){
                rej(err);
            }
            resolve(data)
        })
    });
})


app.use(router.routes());
app.use(static(path.join(__dirname,'dist')));
// 如果匹配不到会执行此逻辑
app.use(async ctx => {
    try {
        ctx.body = await new Promise((resolve,rej)=>{
            console.log(ctx.url);
            render.renderToString({url:ctx.url},(err,data)=>{
                if(err){
                    rej(err);
                }
                resolve(data)
            })
        });
    } catch (error) {
        ctx.body = '404'
    }

});
app.listen(3000);