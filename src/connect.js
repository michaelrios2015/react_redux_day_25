import React, { Component } from "react";

import store from './store';

const connect = (BaseComponent) => {
    return class Connected extends Component {
        constructor(){
        super();
        // we had actually loaded already 
        this.state = store.getState();
    };

    // did not seem to need the unmount stuff but it did not complain 
    componentWillUnmount(){
        this.unsubscribe();
    }

    componentDidMount(){
        // this always confused me 
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState());
        });
    }
        
        render(){
            console.log(this.state)
            return <BaseComponent {...this.state}/>
        }
    }
};

export default connect;