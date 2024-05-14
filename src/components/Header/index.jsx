import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import '../../styles/header.css';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {resetLocalStorage} from "../../utils/utilsFunctions";
 
function Header() {
    const navigate = useNavigate();

    const deconnexion = () => {
        resetLocalStorage();
        navigate('/connexion');
    };

    // Liens à ajouter par la suite
    // <Link to={"/statistiques"} className="headerBouton"><i className="fa-solid fa-chart-simple"></i></Link>
    // <Link to="/profil" className='headerLien'><FontAwesomeIcon icon="fa-solid fa-user" /></Link>

    return (
        <header>
            <nav className='header'>
                <Link to="/home" className='headerLienLogo'>
                    <img src={logo} alt="Logo" className='headerLogo' />
                </Link>
                <Link to="/home" className='headerLien'><FontAwesomeIcon icon="fa-solid fa-house" /></Link>
                <Link to="/enigme" className='headerLien'><FontAwesomeIcon icon="fa-solid fa-play" /></Link>
                <button onClick={deconnexion} className="headerLien headerBouton"><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></button>
            </nav>
        </header>
    );
}

export default Header;