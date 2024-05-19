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

    return (
        <header>
            <nav className='header'>
                <Link to="/home" className='headerLienLogo' title="Détective Puzzly">
                    <img src={logo} alt="Logo" className='headerLogo' />
                </Link>
                <Link to="/home" className='headerLien' title="Page d'accueil"><FontAwesomeIcon icon="fa-solid fa-house" /></Link>
                <Link to="/enigme" className='headerLien' title="Nouvelle énigme"><FontAwesomeIcon icon="fa-solid fa-play" /></Link>
                <Link to="/statistiques" className="headerLien" title="Statistiques"><FontAwesomeIcon icon="fa-solid fa-chart-simple" /></Link>
                <Link to="/moncompte" className='headerLien' title="Mon compte"><FontAwesomeIcon icon="fa-solid fa-user" /></Link>
                <button onClick={deconnexion} className="headerLien headerBouton" title="Déconnexion"><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></button>
            </nav>
        </header>
    );
}

export default Header;