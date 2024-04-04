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

    return (
        <nav className='header'>
            <Link to="/home" className='lien-logo'>
                <img src={logo} alt="Logo" className='logo' />
            </Link>
            <Link to="/home" className='lien'>Accueil</Link>
            <Link to="/profil" className='lien'>Mon profil</Link>
            <Link to="/survey" className='lien'>test</Link>
            <button onClick={deconnexion}><i className="fa-solid fa-right-from-bracket"></i></button>

        </nav>
    );
}

export default Header;