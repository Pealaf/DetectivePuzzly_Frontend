import React, {useState} from "react";
import Input from "../../components/Input";
import { useNavigate } from 'react-router-dom';

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
            .then((response) => response.json())
            .then((jsonResponse) => {
                if(jsonResponse.token) {
                    localStorage.setItem('token', jsonResponse.token);
                    navigate('/survey');
                } else {
                    console.log("Erreur d'authentification");
                }
                return jsonResponse;
            });
    };

    return (
        <div>
            <h1>Création du profil</h1>
            <div>
                <Input type="text" titre="Login" value={login} setValue={setLogin} />
                <Input type="password" titre="password" value={password} setValue={setPassword} />
                <button onClick={connexion}>Enregistrer</button>
            </div>
        </div>
    );
}

export default Profil;