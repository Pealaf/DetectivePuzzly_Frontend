import { Navigate} from 'react-router-dom';
import Header from "../../components/Header";

function CheckAuthentification() {
    if(!localStorage.hasOwnProperty('token')) {
        return <Navigate to="/profil" replace={true} />
    } else {
        return <Header/>
    }
}
export default CheckAuthentification;