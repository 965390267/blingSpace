// import React from 'react';
// import  ReactDOM,{render} from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

let isBatching = true;
class Component {
  constructor(){
    // super();
    this.pendingState = {
      ...this.state
    }
  }
  setState(obj){
    if(isBatching){
      this.pendingState = {
        ...this.pendingState,
        ...obj
      }
    }else {
      this.state = {
        ...this.state,
        ...obj
      }
      this.render();
    }
  }

}
function transaction(c) {
  if(isBatching){

    isBatching = false;
    c.setState(c.pendingState)
  }
}

class My extends Component {
  constructor (){
    super();
    this.state = {n:1}
  }
  update(){
    // this.setState({
    //   n: this.state.n + 1
    // })
    // this.setState({
    //   n: this.state.n + 1
    // })
    // this.setState({
    //   n: this.state.n + 1
    // })
    // this.setState({
    //   n: this.state.n + 1
    // })
    setTimeout(() => {
      this.setState({
        n: this.state.n + 1
      })
      this.setState({
        n: this.state.n + 1
      })
      this.setState({
        n: this.state.n + 1
      })
      this.setState({
        n: this.state.n + 1
      })
    }, 1000);
    transaction(this);
  }
  render(){
    console.log(this.state);
    return ;
  }
}

let my = new My();
my.update();