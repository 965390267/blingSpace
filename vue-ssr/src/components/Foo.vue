<template>
    <div>
        foo
        <button @click="clickMe">点击</button>
    </div>
</template>

<script>
export default {
    asyncData(store){
        return store.dispatch('set_user');
    },
    methods:{
        clickMe(){
            alert("点我")
        }
    }
}
</script>

<style>

</style>