import CheckAuthentification from "../Profil/checkAuthentification";

function App() {
  return (
    <div className="divPrincipale">
        <header>
            {CheckAuthentification()}
        </header>
        <p>
            Bonjour moi
        </p>
    </div>
  );
}

export default App;