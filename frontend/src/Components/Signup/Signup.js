import React, { useState} from 'react';
import axios from 'axios';


const Signup = () => {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('')

    const handleSignUp = (e) => {
        e.preventDefault();
        const pseudoError = document.querySelector('.pseudoerror');
        const emailError = document.querySelector('.emailerror');
        const passwordError = document.querySelector('.passworderror');
        const controlPasswordError = document.querySelector('.passworderror')

        axios({
            method:'post',
            url:`${process.env.REACT_APP_CALL_API}api/user/register`,
            withCredentials: true,
            data: {
                pseudo,
                email,
                password
            },
        })
        .then((res) => {
            console.log(res)
            if(res) {
                pseudoError.innerHTML = res.data.errors.pseudo;
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
                controlPasswordError.innerHTML = res.data.errors.password
            } else {
                window.location = '/'
            }
        })
        .catch((err) => {
            console.log(err);
        })


    }

    return (
        <form action="" onSubmit={handleSignUp} id="login-Form" className='form-container'>
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
            <div className="pseudoerror"></div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className="emailerror"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="passworderror"></div>
            <label htmlFor="password">Comfirmer votre Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
            <div className="passworderror"></div>
            <br />
            <div>
                <input type="checkbox" name="terms" id="terms" className='form-container_checkbox' />
                <label htmlFor="terms">J'accepte les <a href="/" className='form-container_checkbox--link' target="_blank" rel="noopener noreferrer">Conditions générales</a> </label>
            </div>
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default Signup;