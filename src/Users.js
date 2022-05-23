import React, { Component } from "react";
import { connect}  from "react-redux";

// we are making a homemade connect
// so essentially we just pass it into a Component and then we can acess the state through the store

const Users = ( {users } ) => {
    return (
        <ul>
        {
            users.map( user => {
                return (
                    <li key = { user.id }>
                        { user.name }
                    </li>
                );
            })
        }
        </ul>
    )
};

// so just a fancy way to connect to store... I prefer writting out the map to props function
export default connect(
    ({ users })=> {
    return {
        users
    }
}
)(Users);
