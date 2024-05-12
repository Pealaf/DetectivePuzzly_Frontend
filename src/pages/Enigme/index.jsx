import Button from "../../components/Button";
import {Navigate, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {checkAuthentification} from "../../utils/utilsFunctions";
import Header from "../../components/Header";

function PageEnigme() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [enigme, setEnigme] = useState(null);

    const [buttonStates, setButtonStates] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    });

    useEffect(() => {
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
                        localStorage.removeItem('token');
                        localStorage.removeItem('currentUser');
                        navigate('/profil');
                    } else {
                        console.error('Erreur HTTP, statut : ' + response.status);
                        throw new Error('Erreur HTTP');
                    }
                }

                const jsonResponse = await response.json();
                setEnigme(jsonResponse);
                console.log(jsonResponse);
            } catch (error) {
                console.error('Une erreur est survenue :', error);
            } finally {
                setLoading(false); // À la fin de la requête, on arrête le chargement
            }
        }

        genererEnigme();
    }, [navigate]);

    const repondre = (reponse) => {
        if(enigme["reponse_"+reponse] === enigme["solution"]) {
            console.log("Bonne réponse !");
        } else {
            document.getElementById("labelMauvaiseReponse").style.display = "block";
            setButtonStates((prevState) => ({
                ...prevState,
                [reponse]: true
            }));
        }
    };

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
                        {loading ? (
                            <p>Chargement en cours...</p>
                        ) : (
                            <>
                                {enigme && (
                                    <>
                                        <h2>{enigme.intitule}</h2>
                                        <div id="divBoutons">
                                            <div className="divLigneBoutons">
                                                <Button intitule={enigme["reponse_a"]} onClick={() => repondre('a')} disabled={buttonStates.a}/>
                                                <Button intitule={enigme["reponse_b"]} onClick={() => repondre('b')} disabled={buttonStates.b}/>
                                            </div>
                                            <div className="divLigneBoutons">
                                                <Button intitule={enigme["reponse_c"]} onClick={() => repondre('c')} disabled={buttonStates.c}/>
                                                <Button intitule={enigme["reponse_d"]} onClick={() => repondre('d')} disabled={buttonStates.d}/>
                                            </div>
                                            <label id="labelMauvaiseReponse" hidden style={{color: 'darkred', fontWeight: "bold"}}>Mauvaise réponse !</label>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default PageEnigme;