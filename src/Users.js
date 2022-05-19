import React, { Component } from "react";
import connect from "./connect";

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


export default connect(Users);
