import CheckAuthentification from "../Profil/checkAuthentification";

function App() {

    let currentUserLogin = JSON.parse(localStorage.getItem("currentUser"))["username"];

    return (
        <div className="divPrincipale">
            <header>
                {CheckAuthentification()}
            </header>
            <div className="divContent">
                <p>
                    Bonjour {currentUserLogin}
                </p>
            </div>
        </div>
    );
}

export default App;