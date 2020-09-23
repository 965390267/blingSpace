import {parseHTML} from './parse';
import { generate } from './generate';
export function compilerToFunction(template){
    // 生成树
    let ast = parseHTML(template);
    // 优化静态节点
    
    // 通过树生成代码
    let code = generate(ast);

    // 1. 代码转fn 
    // 2. 全局变量转vm with
    let render = new Function(`with(this){return ${code}}`);
    console.log(render);
    return render;

}