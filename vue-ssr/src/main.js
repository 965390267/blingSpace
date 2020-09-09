import Vue from 'Vue';
import App from './App';
import createRouter from './router';
import createStore from './store';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
export default ()=>{
    let router = createRouter(); // 增加路由
    let store = createStore();

    let app = new Vue({
        router,
        store,
        render:(h)=>h(App)
    })
    return {app,router,store}
}
