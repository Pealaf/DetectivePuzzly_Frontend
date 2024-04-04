import { Navigate} from 'react-router-dom';
import Header from "../../components/Header";

function CheckAuthentification() {
    if(!localStorage.hasOwnProperty('token')) {
        return <Navigate to="/profil" replace={true} />
    } else {
        let url = window.location.href;
        let decoupe = url.split(/[/]/);
        if(decoupe[decoupe.length-1] === "profil" || decoupe[decoupe.length-1] === "nouveauProfil") {
            return <Navigate to="/home" replace={true} />
        }
        return <Header/>
    }
}
export default CheckAuthentification;