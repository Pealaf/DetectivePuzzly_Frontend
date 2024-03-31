import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import '../../styles/header.css';
 
function Header() {
    return (
        <nav className='header'>
            <Link to="/home" className='lien-logo'>
                <img src={logo} alt="Logo" className='logo' />
            </Link>
            <Link to="/home" className='lien'>Accueil</Link>
            <Link to="/profil" className='lien'>Mon profil</Link>
            <Link to="/survey" className='lien'>test</Link>
        </nav>
    );
}

export default Header;