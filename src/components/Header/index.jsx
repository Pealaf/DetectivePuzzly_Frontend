import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import '../../styles/header.css';
import React from "react";
 
function Header() {
    const navigate = useNavigate();

    const deconnexion = () => {
        localStorage.removeItem('token');
        navigate('/survey');
    };

    // <Link to="/survey" className='lien'>test</Link>
    return (
        <nav className='header'>
            <Link to="/home" className='lien-logo'>
                <img src={logo} alt="Logo" className='logo' />
            </Link>
            <Link to="/home" className='lien'>Accueil</Link>
            <Link to="/profil" className='lien'>Mon profil</Link>
            <Link to="/enigme" className='lien'>Enigme</Link>
            <button onClick={deconnexion} className="headerBouton"><i className="fa-solid fa-right-from-bracket"></i></button>

        </nav>
    );
}

export default Header;