import React, { useContext } from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';
import  { UserContext } from '../Hooks/UserContext'

const Profil = () => {

    const userId = useContext(UserContext)

    return (
        <div className='profil-page'>
            {userId ? (<h1>PROFIL</h1>) : (
            <div className='registration-container'>
            <RegistrationForm loginForm={true} signupForm={false}/>
            </div>
            )}
        </div>
    );
};

export default Profil;