function genProps(attrs) {
    console.log(attrs);
    let str = "";
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if (attr.name === 'style') {
            let obj = {};
            attr.value.split(';').forEach(item => {
                let [key,value] = item.split(':');
                obj[key] = value;
            })
        }
        str += `${attr.name} : ${JSON.stringify(attr.value)},`
        
    }
    console.log(str);
}

function gen(node) {
    if(node.type == 1){
        return generate(node);
    }else {
        let text = node.text;
        // 如果是普通文本
        return `_v(${JSON.stringify(text)})`
    }
}

function genChildren(el) {
    const children = el.children;
    if(children){
        return children.map(child => gen(child)).join(',');
    }
}

export function generate(el) {
    let children = genChildren(el);
    let code = `_c('${el.tag}',
    ${el.attrs.length ? `${genProps(el.attrs)}` : 'undefine'}
    ${
        children ? `,${children}`: ''
    }
    )`;
    return code;
}