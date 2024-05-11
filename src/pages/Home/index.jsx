import Header from "../../components/Header";
import {checkAuthentification} from "../../utils/utilsFunctions";
import {Navigate} from "react-router-dom";

function Home() {

    // Vérification de la connexion
    if(!checkAuthentification()) {
        return <Navigate to="/profil" replace={true} />;
    } else {
        let currentUserLogin = JSON.parse(localStorage.getItem("currentUser"))["username"];

        return (
            <div className="divPrincipale">
                <header>
                    <Header/>
                </header>
                <div className="divContent">
                    <p>
                        Bonjour {currentUserLogin}
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;