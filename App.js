import React, { useState } from 'react';
import UserForm from './components/UserForm';

const App = () => {
    const [ users, setUsers ] = useState([]);
    const addUser = (newUser) => {
        let newArr = [...users];
        setUsers(newArr.concat(newUser));
        console.log(users);
    }
    return (
        <UserForm />
    )
}

export default App;