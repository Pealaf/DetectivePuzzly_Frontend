export function checkAuthentification() {
    return localStorage.hasOwnProperty('token');
}