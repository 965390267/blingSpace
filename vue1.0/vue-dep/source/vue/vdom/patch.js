// 第一次初次渲染
// 对比操作

/**
 * 让虚拟节点渲染成真实节点
 */
export function render(vnode, container) {
    // 递归创建
    let el = createElm(vnode);
    container.appendChild(el);
}
/**
 * 根据虚拟节点创建真实节点
 * @param {*} vnode 
 */
function createElm(vnode) {
    let {
        tag,
        children,
        key,
        props,
        text
    } = vnode;
    if (typeof tag === 'string') {
        // 标签
        vnode.el = document.createElement(tag);
        updateProperties(vnode);
        children.forEach(child => {
            render(child, vnode.el);
        })
    } else {
        // 文本
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}
/**
 * 更新属性的方法  即将属性渲染到真实dom上
 * @param {*} vnode 虚拟dom
 * @param {*} oldProps 旧的属性值对象 用于后面比对优化
 */
function updateProperties(vnode, oldProps = {}) {
    // debugger;
    // 获取当前老节点的属性
    let newProps = vnode.props;
    // 当前真实节点
    let el = vnode.el;
    let newStyle = newProps.style || {};
    let oldStyle = oldProps.style || {};
    // 根据新的dom节点来修改dom元素
    for (const key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }

    // 如果下次更新时，我应该用新的属性来更新老的属性
    for (const key in oldProps) {
        // 如果老有新无 直接删除
        if (!newProps[key]) {
            delete el[key];
        }
    }

    for (let key in newProps) {
        // 如果是style则需要再次遍历添加
        if (key == 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key == 'class') {
            el.className = newProps['class']
        } else {
            el[key] = newProps[key];
        }
    }
}
export function patch(oldVnode, newVnode) {
    // 1. 标签不同 直接替换
    if (oldVnode.tag !== newVnode.tag) {
        debugger;
        oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el);
    }
    // 2. 比较文本 标签一样 可能都是undefined
    if (!oldVnode.tag) {
        // 如果内容不一致直接根据当前新的元素中的内容来替换到文本节点
        if (oldVnode.text !== newVnode.text) {
            oldVnode.el.textContent = newVnode.text
        }
    }
    // 标签一致 属性不同
    // 1. 复用标签
    let el = newVnode.el = oldVnode.el;
    updateProperties(newVnode, oldVnode.props);

    // 比较孩子
    let oldChildren = oldVnode.children || [];
    let newChildren = newVnode.children || [];
    // 老有新有
    if (oldChildren.length > 0 && newChildren.length > 0) {
        updateChildren(el,oldChildren,newChildren); // 不停的递归比较
    }
    // 老有新无
    else if (oldChildren.length > 0 && newChildren.length > 0) {
        el.innerHTML = ''
    }
    // 老无新有
    else if (oldChildren.length > 0 && newChildren.length > 0) {
        for (let i = 0; i < newChildren.length; i++) {
            const child = newChildren[i];
            el.appendChild(createElm(child));

        }
    }


}
function isSameVnode(oldVnode,newVnode){
    // 如果两个人的标签和key 一样我认为是同一个节点 虚拟节点一样我就可以复用真实节点了
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}
function updateChildren(parent,oldChildren,newChildren){
    // vue增加了很多优化策略 因为在浏览器中操作dom最常见的方法是 开头或者结尾插入
    // 涉及到正序和倒序
    let oldStartIndex = 0; // 老的索引开始
    let oldStartVnode = oldChildren[0]; // 老的节点开始
    let oldEndIndex = oldChildren.length - 1;
    let oldEndVnode = oldChildren[oldEndIndex];


    let newStartIndex = 0; // 新的索引开始
    let newStartVnode = newChildren[0]; // 新的节点开始
    let newEndIndex = newChildren.length - 1;
    let newEndVnode = newChildren[newEndIndex];

    function makeIndexByKey(children){
        let map = {};
        children.forEach((item,index)=>{
            map[item.key] = index
        });
        return map; // {a:0,b:1...}
    }
    let map = makeIndexByKey(oldChildren);
    while(oldStartIndex<=oldEndIndex && newStartIndex <= newEndIndex){
        // 向后插入元素
        if(!oldStartVnode){
            oldStartVnode = oldChildren[++oldStartIndex];
        }else if(!oldEndVnode){
            oldEndVnode = oldChildren[--oldEndIndex]
        }else  if(isSameVnode(oldStartVnode,newStartVnode)){  // 先开前面是否一样
            patch(oldStartVnode,newStartVnode);// 用新的属性来更新老的属性,而且还要递归比较儿子
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex]
        // 当前向前插入
        }else if(isSameVnode(oldEndVnode,newEndVnode)){ // 从后面比较看是否一样
            patch(oldEndVnode,newEndVnode); // 比较孩子 
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        // 倒叙功能 abcd  dcba
        }else if(isSameVnode(oldStartVnode,newEndVnode)){
            patch(oldStartVnode,newEndVnode);
            parent.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex]
            // 这个是比对将尾部插入到了前面
        }else if(isSameVnode(oldEndVnode,newStartVnode)){
            patch(oldEndVnode,newStartVnode);
            parent.insertBefore(oldEndVnode.el,oldStartVnode.el);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex]
        }else {
            // 会先拿新节点的第一项 去老节点中匹配，如果匹配不到直接将这个节点插入到老节点开头的前面，如果能查找到则直接移动老节点
            // 可能老节点中还有剩余 则直接删除老节点中剩余的属性
            let moveIndex = map[newStartVnode.key];
            if(moveIndex == undefined){
                parent.insertBefore(createElm(newStartVnode),oldStartVnode.el);
            }else{
                // 我要移动这个元素
                let moveVnode = oldChildren[moveIndex];
                oldChildren[moveIndex] = undefined;
                parent.insertBefore(moveVnode.el,oldStartVnode.el);
                patch(moveVnode,newStartVnode);
            }
            // 要将新节点的指针向后移动
            newStartVnode = newChildren[++newStartIndex]
        } 
        // 老的尾巴和新的头去比 将老的尾巴移动到老的头的前面
        // 还有一种情况 
        // 倒叙和正序
    }
    if(newStartIndex<=newEndIndex){ // 如果到最后还剩余 需要将剩余的插入
        for(let i = newStartIndex ; i <=newEndIndex; i++){
            // 要插入的元素
            let ele = newChildren[newEndIndex+1] == null? null:newChildren[newEndIndex+1].el;
            parent.insertBefore(createElm(newChildren[i]),ele);
            // 可能是往前面插入  也有可能是往后面插入
            // insertBefore(插入的元素,null) = appendChild
            // parent.appendChild(createElm(newChildren[i]))
        }
    }
    if(oldStartIndex <= oldEndIndex){
        for(let i = oldStartIndex; i<=oldEndIndex;i++){
            let child = oldChildren[i];
            if(child != undefined){
                parent.removeChild(child.el)
            }
        }
    }
    // 循环的是 尽量不要使用索引作为key 可能会导致重新创建当前元素的所有子元素
}