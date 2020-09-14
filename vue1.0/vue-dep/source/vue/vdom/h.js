import {vnode} from './create-element';
export default function h(tag,props,...children) {
    let key = props.key;
    // 避免key也被渲染在属性上了
    delete props.key;
    children = children.map(child=>{
        if(typeof child === 'object'){
            return child;
        }else {
            return vnode(undefined,undefined,undefined,undefined,child)
        }
    })
    return vnode(tag,props,key,children)
}