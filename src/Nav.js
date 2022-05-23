import React, { Component } from "react";
import store from './store';
import axios from "axios";
// we had our home made one now we have one from react redux
import { connect }  from "react-redux";

const Nav = ( { count, createUser }) => {
    // sayHi();
    return (
        <nav>
        <a href=''>Home</a>
        <a href='#users'>Users ({count})</a>
        <button onClick={ createUser }>create User</button>
        </nav>
    );

}
// ok so the map state starts to come in
// so get the state from the store and put it in props I believe
const mapStateToProps = ({ users }) => {
    return {
        count: users.length
    }
};
// so now we can also disptach to props.... I have questions
const mapDispatchToProps = (dispatch)=> {
    // so I can pass a value to the props or the store??
    // so we are putting it in the store... yes 
    return {
        createUser: async()=> {    
            const user = (await axios.post('/api/users')).data
            store.dispatch({
            type: 'CREATE_USER',
            user
        })
    }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);


// export default connect(Nav);