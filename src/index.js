import React, { Component } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
// so apperently that is teh difference between defualt and regular default do not need the {} thing and regular does
import Users from './Users';
import Nav from './Nav';
import store from './store';
// import connect from './connect';
// this will be how react redux connects to the store I believe
import { Provider, connect } from 'react-redux';

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
        this.props.load();
        // const users = (await axios.get('/api/users')).data;

        // store.dispatch({
        //     type: 'LOAD_USERS',
        //     users
        // });
        // store.dispatch({
        //     type: 'LOADED'
        // });

    }
    
    render(){
        const { view } = this.state;
        // I am not sure if I understand the differnce between props and state 
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

// so we don't need to return the whole state
const mapStateToProps = ({ loading }) => {
    return {
        loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: async()=> {
            const users = (await axios.get('/api/users')).data;

            dispatch({
                type: 'LOAD_USERS',
                users
            });
            dispatch({
                type: 'LOADED'
            });

        }
    }
};
// so a component in a a component... interesting 
const App = connect(mapStateToProps, mapDispatchToProps)(_App);


const container = document.querySelector('#root');
const root = createRoot(container); 
// so this hopefully then lets react redux know where we are connnecting to the store
root.render(<Provider store={ store }><App tab="home" /></Provider>);

