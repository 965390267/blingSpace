import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
let Context = React.createContext();

export default class Provider extends Component {
    render() {

        return (
            <Context.Provider value={this.props.store}>
                {this.props.children}
            </Context.Provider>
           
        );
    }
};

let connect = (mapStateToProps,mapDispatchToProps) => (Component) => {
    return () => {
        
        class Proxy extends Component {
            state = this.props.store.getState()
            componentDidMount(){
                this.unsub = this.props.store.subscribe(()=>{
                  this.setState(
                      this.props.store.getState()
                  )  
                })
            }
            componentWillUnmount(){
                this.unsub();
            }
            render(){
                let actions;
        if (typeof mapDispatchToProps == 'function') {
            actions = mapDispatchToProps(this.props.store.dispatch)
        }else {
            actions = bindActionCreators(mapDispatchToProps,this.props.store.dispatch)
        }
                return (
                    <Component   
                        {...(mapStateToProps(this.state))}
                        {...actions}
                    ></Component>
                )
            }
        }
        return <Context.Consumer>
            {(store)=>{
                return <Proxy store = {store}></Proxy>
            }}
        </Context.Consumer>
    }
}
export {
    Provider,
    connect
}