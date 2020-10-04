// import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

let React = {
  createElement(type,props,...children) {
    console.log(type,props,children)
    return {
      type,props,children
    }
  }
}

let render = (obj,container) => {
  if (typeof obj == 'string') {
    return container.appendChild(document.createTextNode(obj))
  }
  debugger;
  let {
          type,props,children
        } = obj;

  let ele = document.createElement(type);
  for (const key in props) {
    ele.setAttribute(key,props[key]);
    children.forEach((children)=>{
      render(children,ele);
    })
    container.appendChild(ele);
  }
}

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
document.write('hello')
console.log(React);
let ele = <h1>111</h1>
console.log(ele);
render(ele,document.getElementById('root'))