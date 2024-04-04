import React, {useState} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link, useNavigate} from 'react-router-dom';
import CheckAuthentification from "./checkAuthentification";

function Profil() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const connexion = async () => {
        let donnees = {
            "username" : login,
            "password" : password
        };

        await fetch("http://localhost:8000/api/login_check", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                //"Content-Transfer-Encoding": "application/json"
            },
            body: JSON.stringify(donnees),
        })
            .then(response => {
                // Vérifie si la requête a réussi
                if (!response.ok) {
                    if (response.status === 401) {
                        document.getElementById("labelIdentifiantsIncorrects").style.display = "block";
                    } else {
                        // Gérer d'autres erreurs HTTP
                        console.error('Erreur HTTP, statut : ' + response.status);
                        throw new Error('Erreur HTTP');
                    }
                }
                // Parse la réponse JSON
                return response.json();
            })
            .then((jsonResponse) => {
                if(jsonResponse.token) {
                    localStorage.setItem('token', jsonResponse.token);
                    localStorage.setItem('login', login);
                    navigate('/survey');
                } else {
                    document.getElementById("labelIdentifiantsIncorrects").style.display = "block";
                }
                return jsonResponse;
            }).catch(error => {
                // Gère les erreurs
                console.error('Une erreur est survenue :', error);
            });
    };

    return (

        <div className="divConnexion">
            {CheckAuthentification()}
            <h1>Connexion</h1>
            <div>
                <label id="labelIdentifiantsIncorrects" hidden style={{color:'red', fontWeight:"bold"}}>Identifiants incorrects !</label>
                <Input type="text" name="login" label="Login" value={login} setValue={setLogin} />
                <Input type="password" name="password" label="Mot de passe" value={password} setValue={setPassword} />
                <br/>
                <Button intitule="Enregistrer" onClick={connexion} />
                <br/>
                <Link to="/nouveauProfil">Nouveau compte</Link>
            </div>
        </div>
    );
}

export default Profil;