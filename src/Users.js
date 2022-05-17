import React, { Component } from "react";
import store from './store';


// class Users extends Component{
//     constructor(){
//         super();
//         // we had actually loaded already 
//         this.state = {
//             users: store.getState().users
//         };
//     };

//     // did not seem to need the unmount stuff but it did not complain 
//     componentWillUnmount(){
//         this.unsubscribe();
//     }

//     componentDidMount(){
//         this.unsubscribe = store.subscribe(()=>{
//             this.setState({
//                 users: store.getState().users
//             });
//         });
//     }
//     render(){
//         const { users } = this.state
//         return (
//             <div>
//             <h2>Users ({ users.length })</h2>
//             <ul>
//                 {
//                     users.map( user => {
//                         return (
//                             <li key = { user.id }>
//                                 { user.name }
//                             </li>
//                         );
//                     })
//                 }
//             </ul>
//         </div>
//         );
//     }
// }

// we are making a homemade connect
// so essentially we just pass it into a Component and then we can acess the state through the store
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
