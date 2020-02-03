import React , { useState } from "react";
import './AdminLogin.css'
import { adminLogIn } from "../../../../api";


function AdminLogin (props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (<div className="admin-login">
        <form className="admin-login__form" onSubmit={onsubmit}>
            <img className="admin-login__logo" src="/images/logo.svg" alt=""/>
            <input className="admin-login__input" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            <input className="admin-login__input" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button className="admin-login__btn" type='submit'>Log in</button>
        </form>
    </div>);

    function onsubmit(e) {
        e.preventDefault();
        adminLogIn(email, password).then(user => {
            props.onLogin(user)
        }).catch(error => {
            console.log(error)
        })
    }
};

export default AdminLogin;
