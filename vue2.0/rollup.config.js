import babel from "rollup-plugin-babel";
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
export default {
    input: './src/index.js',
    output: {
        format: 'umd',
        name: 'Vue',
        file: 'dist/umd/vue.js',
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        // 热更新 默认监听根文件夹
        livereload(),
        serve({
            port: 3000,
            contentBase: '',
            openPage:'/index.html'
        })
    ]
}