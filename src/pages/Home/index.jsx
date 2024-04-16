import CheckAuthentification from "../Profil/checkAuthentification";

function App() {

    let currentUserLogin = JSON.parse(localStorage.getItem("currentUser"))["username"];

    return (
        <div className="divPrincipale">
            <header>
                {CheckAuthentification()}
            </header>
            <p>
                Bonjour {currentUserLogin}
            </p>
        </div>
    );
}

export default App;