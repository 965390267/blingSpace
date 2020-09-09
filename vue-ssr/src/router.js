import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Bar from './components/Bar.vue';
import Foo from './components/Foo.vue';
export default ()=>{
    let router = new VueRouter({
        mode:'history',
        routes:[
            {
                path:'/', component:Bar,
            },
            {
                path:'/foo',component:Foo
            }
        ]
    });
    return router
}