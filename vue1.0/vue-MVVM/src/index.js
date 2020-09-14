import Vue from '../source/vue';


var vm = new Vue({
    el: "#app",
    data() {
        return {
            msg: '最好的我们',
            arr: ['少年听雨歌楼上'],
            firstName: 'zhiyuan',
            lastName: 'wang'
        }
    },
    computed: {
        name(){
            return this.firstName + this.lastName;
        }
    },
    watch: {
        msg: {
            immediate: true,
            handler(newValue, oldValue) {
                console.log(newValue, oldValue);
            }
        }
    }
})
setTimeout(() => {
    // debugger;
    vm.firstName = 'wang'
    // vm.msg = '加油';
    // vm.arr.push('红烛晕罗帐')
    // console.log(vm);
}, 1000);