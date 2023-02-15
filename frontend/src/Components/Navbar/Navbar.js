import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Hooks/UserContext';

const Navbar = () => {

    const userId = useContext(UserContext)

    return (
        <nav className='nav-container'>
            <div className="nav-container_block">
            <Link to="/" className='nav-container_center'>Accueil</Link>
            {userId ? (
                <ul className='nav-profil'>
                    <li className='nav-profil_li'>
                        <Link to='/Profil'>
                            <div>Nom utilisateur</div>
                        </Link>
                    </li>
                    <li className='nav-profil_li'>
                        Déconnexion
                    </li>
                </ul>
            ) : (
                <ul className='nav-profil'>
                    <li className='nav-profil_li'>
                        <Link to='/Profil'>
                         <div>Connexion</div>
                        </Link>
                    </li>
                </ul>
            )}
            </div>
        </nav>
    );
};

export default Navbar;