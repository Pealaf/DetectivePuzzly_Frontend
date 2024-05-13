/**
 * Méthode permettant de vérifier si l'utilisateur est authentifié
 * @returns {boolean}
 */
export function checkAuthentification() {
    return localStorage.hasOwnProperty('token');
}

/**
 * Méthode permettant d'effacer tout le contenu du local storage
 */
export function resetLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
}