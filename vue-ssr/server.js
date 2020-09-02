const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static');

const app = new Koa();
const router = new Router();

const Vue = require('vue');
const VueServerRender = require('vue-server-renderer');

const fs = require('fs');
const vm = new Vue({
    data(){
        return {
            msg: 'Hello11'
        }
    },
    template: `<div>{{msg}}</div>`
})

const template = fs.readFileSync('./template.html','utf8');

let render = VueServerRender.createRenderer({
    template
});
router.get('/',async ctx =>{
    ctx.body = await render.renderToString(vm);
})


app.use(router.routes());

app.listen(3000);