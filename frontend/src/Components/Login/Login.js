import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.emailerror')
        const passwordError = document.querySelector('.passworderror')


        axios({
            method: "post",
            url: `${process.env.REACT_APP_CALL_API}api/user/login`,
            withCredentials : true,
            data: {
                email,
                password,
            },
        })
        .then((response) => {
            console.log(response)
            if (response.data.err) {
                emailError.innerHTML = response.data.err;
                passwordError.innerHTML = response.data.err;
            } else {
                window.location = '/'
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <form action="" onSubmit={handleLogin} id="login-Form" className='form-container'>

            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className="emailerror"></div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="passworderror"></div>
            <br />
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default Login;