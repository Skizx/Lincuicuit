import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';

const Profil = () => {
    return (
        <div className='profil-page'>
            <div className='registration-container'>
            <RegistrationForm loginForm={true} signupForm={false}/>
            </div>
        </div>
    );
};

export default Profil;