import Vue from 'Vue';
import App from './App';




export default () => {
    const app = new Vue({
        render : h=>h(App)
    })
    return {app};
}