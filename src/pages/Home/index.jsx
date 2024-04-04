import CheckAuthentification from "../Profil/checkAuthentification";

function App() {
  return (
    <div className="App divPrincipale">
        {CheckAuthentification()}
        <header className="App-header">
            <p>
              Bonjour moi
            </p>
        </header>
    </div>
  );
}

export default App;