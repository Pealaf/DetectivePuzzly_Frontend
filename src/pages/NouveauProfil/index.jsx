import React, {useState} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link, useNavigate} from 'react-router-dom';
import checkAuthentification from "../Profil/checkAuthentification";

function NouveauProfil() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const navigate = useNavigate();

    const creationCompte = async () => {
        let messageErreur = document.getElementById("labelErreur");
        if(password.length >= 8) {
            if(password === confirmationPassword && password) {
                let loginExistant = await checkLogin(login);
                if(!loginExistant) {
                    let donnees = {
                        "login" : login,
                        "roles" : {"roles":"user"},
                        "password" : password
                    };

                    await fetch("http://localhost:8000/api/users", {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(donnees),
                    }).then(response => {
                        // Vérifie si la requête a réussi
                        if (!response.ok) {
                            if (response.status === 401) {
                                document.getElementById("labelErreur").style.display = "block";
                            } else {
                                // Gérer d'autres erreurs HTTP
                                console.error('Erreur HTTP, statut : ' + response.status);
                                throw new Error('Erreur HTTP');
                            }
                        }
                        // Parse la réponse JSON
                        return response.json();
                    }).then((jsonResponse) => {
                        if(jsonResponse.id) {
                            window.alert("Votre compte a bien été créé !");
                            navigate('/profil');
                        }
                    }).catch(error => {
                        // Gère les erreurs
                        console.error('Une erreur est survenue :', error);
                    });
                } else {
                    messageErreur.textContent = "Le login est déjà utilisé.";
                    messageErreur.style.display = "block";
                }
            } else {
                messageErreur.textContent = "Le mot de passe et la confirmation du mot de passe doivent être identiques.";
                messageErreur.style.display = "block";
            }
        } else {
            messageErreur.textContent = "Le mot de passe doit faire 8 caractères minimum.";
            messageErreur.style.display = "block";
        }
    }

    return (
        <div className="divConnexion">
            {checkAuthentification()}
            <h1>Création du profil</h1>
            <div>
                <label id="labelErreur" hidden style={{color:'red', fontWeight:"bold"}}></label>
                <Input type="text" name="login" label="Login" value={login} setValue={setLogin} />
                <Input type="password" name="password" label="Mot de passe" value={password} setValue={setPassword} />
                <Input type="password" name="confirmationPassword" label={"Confirmation du mot de passe"} value={confirmationPassword} setValue={setConfirmationPassword} />
                <br/>
                <Button intitule="Créer mon compte" onClick={creationCompte} />
                <br/>
                <Link to="/profil">Compte déjà existant</Link>
            </div>
        </div>
    );
}

async function checkLogin (login){
    let result;
    await fetch("http://localhost:8000/api/users/login/"+login, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        result = response.ok;
    })
    .catch(error => {
        // Gère les erreurs
        console.error('Une erreur est survenue :', error);
    });
    return result;
}

export default NouveauProfil;