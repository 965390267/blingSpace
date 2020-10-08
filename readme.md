## 使用react
- react  核心包
- react-dom dom渲染                    
- react-scripts
- prop-types  类型校验

## 基础概念
- jsx语法 ： js + xml
- jsx-transform -> jsx 语法转换成js语法

## jsx
### 语法
- <> 是html元素
- {} 是js语法 变量
- style 需要 {{}}
- dangerouslySetInnerHTML
- 可以直接渲染数组，如果想渲染对象，需要转化成字符串格式
- ref
    - 回调`(dom) => {
              console.log(dom);
              this.username = dom
            }`
    - createRef
        - ` password = React.createRef()`
        - `ref={this.password`
        - `this.password.current`  代表 对应dom

### 组件
#### 函数式组件
- this指向undefined
- react 默认会在函数上挂载render方法，其返回值是函数本身的返回值

#### 类组件
- 本身需要写一个render函数
- 解决方法的this指向问题（函数执行作用域不定）
    - bind
    - construtor中覆盖
    - es7 箭头函数
- setState 同步異步问题
    - isBatching 默认为 true

#### 组件通信
- props
- Provider Consumer

## 注意
- 在react中 我们会使用jsx语法  所以需要注意大小写