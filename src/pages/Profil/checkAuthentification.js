import { Navigate} from 'react-router-dom';
import Header from "../../components/Header";

function CheckAuthentification() {
    let url = window.location.href;
    let decoupe = url.split(/[/]/);
    let page = decoupe[decoupe.length-1];
    if(!localStorage.hasOwnProperty('token')) {
        if(page !== "nouveauProfil")
            return <Navigate to="/profil" replace={true} />
    } else {

        if(page === "profil" || page === "nouveauProfil") {
            return <Navigate to="/home" replace={true} />
        }
        return <Header/>
    }
}
export default CheckAuthentification;