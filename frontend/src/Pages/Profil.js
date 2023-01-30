import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';

const Profil = () => {
    return (
        <div className='profil-page'>
            Profils
            <div className='registration-container'>
            <RegistrationForm />
            <div className='registration-img'>
                <img src="" alt="" />
            </div>
            </div>
        </div>
    );
};

export default Profil;