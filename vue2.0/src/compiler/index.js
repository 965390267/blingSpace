import {parseHTML} from './parse';
import { generate } from './generate';
export function compilerToFunction(template){
    // 生成树
    let ast = parseHTML(template);
    // 优化静态节点
    
    // 通过树生成代码
    let code = generate(ast);

    console.log(code);

}