const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const app = new Koa();
const router = new Router();
const VueServerRender = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');
let ServerBundle = fs.readFileSync("./dist/server.bundle.js",'utf-8');


const template = fs.readFileSync('./dist/index.ssr.html','utf8');

let render = VueServerRender.createBundleRenderer(ServerBundle,{
    template
});
router.get('/',async ctx =>{
    ctx.body = await new Promise((resolve,rej)=>{
        render.renderToString((err,data)=>{
            if(err){
                rej(err);
            }
            resolve(data)
        })
    });
})


app.use(router.routes());
app.use(static(path.join(__dirname,'dist')))
app.listen(3000);