import React, { useState } from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const RegistrationForm = (props) => {
    
    const [loginForm, setLoginForm] = useState(props.loginForm);
    const [signupForm, setSignupForm] = useState(props.signupForm);

    const handleModals = (e) => {
        if (e.target.id === "login") {
            setLoginForm(true)
            setSignupForm(false)
        } else if (e.target.id === "register") {
            setSignupForm(true)
            setLoginForm(false)
        }
    }

    return (
        <div className='registration-form'>
            <div className="registration-form_container">
                <div className="registration-title">
                    <h1>LINCUICUIT</h1>
                </div>
                <ul className='registration-title_button'>
                    <li onClick={handleModals} id="login" className="btn-active registration-title_li">Connexion</li>
                    <li onClick={handleModals} id="register" className='btn-active registration-title_li'>S'inscrire</li>
                </ul>
                    {loginForm && <Login />}
                    {signupForm && <Signup />}
            </div>
        </div>
    );
};

export default RegistrationForm;