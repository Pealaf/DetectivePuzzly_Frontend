import Button from "../../components/Button";
import {Navigate, Route, useNavigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {checkAuthentification, redirectToLogInPage} from "../../utils/utilsFunctions";
import Header from "../../components/Header";

function PageEnigme() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [enigmeInProgress, setEnigmeInProgress] = useState(true);
    const [enigme, setEnigme] = useState(null);

    const [buttonStates, setButtonStates] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    });

    const genererEnigme = async () => {
        let idCurrentUser = JSON.parse(localStorage.getItem("currentUser"))["id"];
        let token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8000/api/enigmes/generate/" + idCurrentUser, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    redirectToLogInPage();
                } else {
                    console.error('Erreur HTTP, statut : ' + response.status);
                    throw new Error('Erreur HTTP');
                }
            }

            const jsonResponse = await response.json();
            setEnigme(jsonResponse);
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        } finally {
            setLoading(false); // À la fin de la requête, on arrête le chargement
        }
    }

    useEffect(() => {
        setLoading(true);

        genererEnigme();
    }, [navigate]);

    const repondre = (reponse) => {
        if(enigme["reponse_"+reponse] === enigme["solution"]) {
            // Mise à jour de l'énigme en BDD
            enigme.resolue = true;
            updateEnigme();

            // Affichage d'un message + possibilité de résoudre une autre énigme
            setButtonStates(false, false, false, false);
            setEnigmeInProgress(false);
            setLoading(true);
            document.getElementById("labelMauvaiseReponse").style.display = "none";
        } else {
            document.getElementById("labelMauvaiseReponse").style.display = "block";
            setButtonStates((prevState) => ({
                ...prevState,
                [reponse]: true
            }));
        }
    };

    const updateEnigme = async () => {
        let token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8000/api/enigmes/" + enigme.id, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token
                },
                body: JSON.stringify(enigme)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    redirectToLogInPage();
                } else {
                    console.error('Erreur HTTP, statut : ' + response.status);
                    throw new Error('Erreur HTTP');
                }
            }

            const jsonResponse = await response.json();
            setEnigme(jsonResponse);
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }
    }

    const nouvelleEnigme = () => {
        genererEnigme();
        setEnigmeInProgress(true);
    }

    // Vérification de la connexion
    if(!checkAuthentification()) {
        return <Navigate to="/profil" replace={true} />;
    } else {
        return (
            <div className="divPrincipale">
                <header>
                    <Header/>
                </header>

                <div className="divContent">
                    <div className="divConnexion">
                        {enigmeInProgress ? (
                            <>
                                {loading ? (
                                    <p>Chargement en cours...</p>
                                ) : (
                                    <>
                                        {enigme && (
                                            <>
                                                <h2>{enigme.intitule}</h2>
                                                <div id="divBoutons">
                                                    <div className="divLigneBoutons">
                                                        <Button intitule={enigme["reponse_a"]} classe="boutonReponse" onClick={() => repondre('a')} disabled={buttonStates.a}/>
                                                        <Button intitule={enigme["reponse_b"]} classe="boutonReponse" onClick={() => repondre('b')} disabled={buttonStates.b}/>
                                                    </div>
                                                    <div className="divLigneBoutons">
                                                        <Button intitule={enigme["reponse_c"]} classe="boutonReponse" onClick={() => repondre('c')} disabled={buttonStates.c}/>
                                                        <Button intitule={enigme["reponse_d"]} classe="boutonReponse" onClick={() => repondre('d')} disabled={buttonStates.d}/>
                                                    </div>
                                                    <label id="labelMauvaiseReponse" hidden style={{color: 'darkred', fontWeight: "bold"}}>Mauvaise réponse !</label>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <p>Bonne réponse</p>
                                <Button intitule="Nouvelle énigme" onClick={() => nouvelleEnigme()} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default PageEnigme;