import React, { useState} from 'react';
import axios from 'axios';
import Login from '../Login/Login';


const Signup = () => {

    const [switchForm, setSwitchForm] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault();
        const pseudoError = document.querySelector('.pseudoerror');
        const emailError = document.querySelector('.emailerror');
        const passwordError = document.querySelector('.passworderror');
        const controlPasswordError = document.querySelector('.passwordconfirmerror');
        const terms = document.getElementById("checkbox")
        const termsError = document.querySelector('.termserror')

        controlPasswordError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if(password !== controlPassword)
            controlPasswordError.innerHTML = "Les mots de passe ne correspondent pas"
            if (!terms.checked)
            termsError.innerHTML = "Veuillez accepter les conditions générales"
        } else {
            await axios({
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
                if(res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    setSwitchForm(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })

        }    
    }

    return (
        <>
        {switchForm ? (
            <>
            <Login />
            <h2 className='signup-succes'>Enregistrement réussi, vous pouvez maintenant vous connecter</h2>
            </>
        ) : (

            <form action="" onSubmit={handleSignUp} id="login-Form" className='form-container'>
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
            <div className="pseudoerror"></div>
            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className="emailerror"></div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="passworderror"></div>
            <label htmlFor="password">Confirmer votre Mot de passe</label>
            <input type="password" name='controlpassword' id='controlpassword' onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
            <div className="passwordconfirmerror"></div>
            <div>
                <input type="checkbox" name="terms" id="checkbox" className='form-container_checkbox' />
                <label htmlFor="terms">J'accepte les <a href="/" className='form-container_checkbox--link' target="_blank" rel="noopener noreferrer">Conditions générales</a> </label>
            </div>
            <div className="termserror"></div>
            <br />
            <input type="submit" value="S'inscrire" />
        </form>
        )}
        </>
    );
};

export default Signup;