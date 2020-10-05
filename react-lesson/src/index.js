import React from 'react';
import ReactDOM,{render} from 'react-dom';


class ChildCounter extends React.Component {
    state = {}
    componentWillMount(){
        console.log('son componentWillMount');
    }
    componentDidMount(){
        console.log('son componentDidMount');
    }
    componentWillReceiveProps(){

    }
    getSnapshotBeforeUpdate(){

    }
    static getDerivedStateFromProps(){

    }
    render() {
        console.log('son render');
        return (
            <div>
                子
            </div>
        )
    }
}

class Counter extends React.Component {
    static defaultProps = {}
    state = {
        count: 0
    }
    constructor(){
        super()
        console.log('constructor');

    }
    componentWillMount(){
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    // 解决状态未改变却还执行render的问题  PureComponent本质上只是重写了这个方法
    shouldComponentUpdate(nextProps,nextState) {
        console.log(nextState);
        return nextState.count == this.state.count ? false : true;
    }
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    handleClick = () => {
        this.setState({
            count:this.state.count+1
        })
    }
    render() {
        console.log('render');
        return (
            <div>
                <button onClick={this.handleClick}>增加</button>
                <ChildCounter></ChildCounter>
            </div>
        )
    }
}
// constructor
// componentWillMount    (此钩子函数因存在多次调用的可能，已被react废弃)
// render
// componentDidMount
render(<Counter>

</Counter>,window.root)