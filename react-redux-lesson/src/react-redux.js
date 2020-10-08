import React, { Component } from 'react';
import store from './store';
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
                return (
                    <Component   
                        {...(mapStateToProps(this.state))}
                        {...(mapDispatchToProps(this.props.store.dispatch))}
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