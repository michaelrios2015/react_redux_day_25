import React, { Component } from "react";
import store from './store';
import axios from "axios";
import connect from "./connect";


// so this needs to be a seperate function outside the wrapper thing
const createUser = async() => {
    const user = (await axios.post('/api/users')).data
    store.dispatch({
        type: 'CREATE_USER',
        user
    })
}

const Nav = ( { users }) => {
    return (
        <nav>
        <a href=''>Home</a>
        <a href='#users'>Users ({users.length})</a>
        <button onClick={ createUser }>create User</button>
        </nav>
    );

}


export default connect(Nav);