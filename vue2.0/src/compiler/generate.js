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

export function generate(el) {
    let code = `_c('${el.tag}',
    ${el.attrs.length ? `${genProps(el.attrs)}` : 'undefine'})`;
}