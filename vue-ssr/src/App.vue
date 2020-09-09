<template>
    <div id="app">
        <router-link to="/"> bar</router-link>
        <router-link to="/foo"> foo</router-link>
        <router-view></router-view>
        <button @click="clickMe">
            点我
        </button>
    </div>
</template>

<script>
import Bar from './components/Bar';
import Foo from './components/Foo';
export default {
    components: {
        Bar,
        Foo
    },
    methods: {
    clickMe(){
        alert(1)
    }}
}
</script>

<style>

</style>