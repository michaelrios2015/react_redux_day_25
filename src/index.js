import React, { Component } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
// so apperently that is teh difference between defualt and regular default do not need the {} thing and regular does
import Users from './Users';
import Nav from './Nav';
import store from './store';
import connect from './connect';

class _App extends Component {
    constructor(){
        super();
        this.state = { view: '' };
    }

    async componentDidMount(){
        
        window.addEventListener('hashchange', ()=> {
            this.setState({ view: window.location.hash.slice(1)});
        })

        this.setState({ view: window.location.hash.slice(1)});

        const users = (await axios.get('/api/users')).data;

        store.dispatch({
            type: 'LOAD_USERS',
            users
        });
        store.dispatch({
            type: 'LOADED'
        });

    }
    
    render(){
        const { view } = this.state;
        const { loading } = this.props;
        console.log(this.state);
        if (loading){
            return '.....loading';
        }
        return (
            <div>
                <Nav/>
                { view === '' ? <div>Home</div> : <Users/> }
            </div>
        );
    }
}

// so a component in a a component... interesting 
const App = connect(_App);
const container = document.querySelector('#root');
const root = createRoot(container); 
root.render(<App tab="home" />);

