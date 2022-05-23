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
        //so we are calling the function from here and it's in props  
        this.props.load();

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
            // gets users from database
            const users = (await axios.get('/api/users')).data;
            
            // puts them in store
            // these know to dispatch to the store
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

