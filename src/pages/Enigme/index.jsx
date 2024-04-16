import CheckAuthentification from "../Profil/checkAuthentification";
import Input from "../../components/Input";
import React, {useState} from "react";
import Button from "../../components/Button";

function PageEnigme() {

    const [reponse, setReponse] = useState('');

    return (
        <div className="divPrincipale">
            <header>
                {CheckAuthentification()}
            </header>
            <div className="divContent">
                <div className="divConnexion">
                    <h1>Qu'est-ce qui peut être dans la mer et dans le ciel ?</h1>
                    <Input type="text" name="reponse" label="Réponse" value={reponse} setValue={setReponse} />
                    <Button intitule="Valider" />
                </div>
            </div>

        </div>
    );
}

export default PageEnigme;