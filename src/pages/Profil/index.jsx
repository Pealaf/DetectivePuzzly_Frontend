import React, {useState} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {checkAuthentification} from "../../utils/utilsFunctions";

function Profil() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const connexion = async () => {
        let donnees = {
            "username": login,
            "password": password
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
            .then(async (jsonResponse) => {
                if (jsonResponse.token) {
                    localStorage.setItem('token', jsonResponse.token);
                    await recupererUser();
                    navigate('/home');
                } else {
                    document.getElementById("labelIdentifiantsIncorrects").style.display = "block";
                }
                return jsonResponse;
            }).catch(error => {
                // Gère les erreurs
                console.error('Une erreur est survenue :', error);
            });
    };

    const recupererUser = async () => {
        // Récupération du token
        const token = localStorage.getItem("token");
        // Décoder le token JWT
        const decodedToken = jwtDecode(token);

        // Afficher les données décodées
        await fetch("http://localhost:8000/api/users/login/" + decodedToken["username"], {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
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
                if (jsonResponse) {
                    localStorage.setItem('currentUser', JSON.stringify(jsonResponse));
                } else {

                }
                return jsonResponse;
            }).catch(error => {
                // Gère les erreurs
                console.error('Une erreur est survenue :', error);
            });
    };

    // Vérification de la connexion
    if(checkAuthentification()) {
        return <Navigate to="/home" replace={true} />;
    } else {
        return (
            <div className="divContent">
                <div className="divConnexion">
                    <h1>Connexion</h1>
                    <div>
                        <label id="labelIdentifiantsIncorrects" hidden style={{color: 'red', fontWeight: "bold"}}>Identifiants
                            incorrects !</label>
                        <Input type="text" name="login" label="Login" value={login} setValue={setLogin}/>
                        <Input type="password" name="password" label="Mot de passe" value={password}
                               setValue={setPassword}/>
                        <br/>
                        <Button intitule="Enregistrer" onClick={connexion}/>
                        <br/>
                        <Link to="/nouveauProfil">Nouveau compte</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profil;