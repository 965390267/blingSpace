// <div>姓名 {{name}} <span>111</span></div>   =>>
// {
//     tag: 'div',
//     parent: null,
//     attrs: [],
//     children: [{
//         tag: null,
//         parent: 父div,
//         text: "姓名 {{name}}"
//     },{
//         tag: 'span',
//         parent: 父div,
//         attrs: [],
//         children: [{
//             tag:null,
//             parent: 父div,
//             text: 111
//         }]
//     }]
// }
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 以 a-z A-Z _ 开头 后面可以接\-\.0-9_a-zA-Z]
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g   // mustatine  语法
// 注意match
// 1. 没有 g   ： 返回标准匹配格式，即：数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是目标字符串
// 2. 有g ：返回的是一个包含所有匹配内容的数组
function start(tagName,attrs) {

console.log(tagName,attrs,"======开始标签 属性");
}
function end(tagName){
console.log(tagName,"======结束标签");
}
function chars(text){
    console.log(text,"======文本");
}

function parseHTML(html) {
    // debugger;
    while (html){
        // 1. 以<开头的必是 标签
        let textEnd = html.indexOf('<');
        if(textEnd == 0){
            const startTagMatch = parseStartTag();
            if(startTagMatch){
                start(startTagMatch.tagName,startTagMatch.attrs);
                continue;
            }
            const endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);// 将结束标签传入
                continue;
            }
        }
        let text;
        // 如果是文本
        if(textEnd >= 0){
            text = html.substring(0,textEnd);
        }
        if(text){
            advance(text.length);
            chars(text);
        }
    }
    // 将字符串进行截取操作，再更新字符串
    function advance(n) {
        html = html.substring(n)

    }
    function parseStartTag(){
        const start = html.match(startTagOpen);
        if(start){
            const match = {
                tagName: start[1],
                attrs:[]
            }
            advance(start[0].length);
            let attr,end;
            // 1. 不是结尾 2. 存在属性
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
               match.attrs.push( {
                    name:attr[1],
                    value: attr[3] || attr[4] || attr[5],
                })
                advance(attr[0].length);
            }
            if(end){
                advance(end[0].length);
                return match;
            }
        }
        // console.log(html);
    }
}
export function compilerToFunction(template){
    console.log(template);

    let ast = parseHTML(template);
}