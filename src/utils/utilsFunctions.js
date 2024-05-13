import {useNavigate} from "react-router-dom";

const navigate = useNavigate();

/**
 * Méthode permettant de vérifier si l'utilisateur est authentifié
 * @returns {boolean}
 */
export function checkAuthentification() {
    return localStorage.hasOwnProperty('token');
}

/**
 * Méthode permettant de rediriger vers la page d'accueil en cas d'erreur 401
 */
export function redirectToLogInPage() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/profil');
}