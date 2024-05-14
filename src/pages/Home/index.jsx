import Header from "../../components/Header";
import {checkAuthentification, resetLocalStorage} from "../../utils/utilsFunctions";
import {Navigate, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Button from "../../components/Button";

function Home() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        getInfos();
    }, [navigate]);

    const getInfos = async () => {
        let token = localStorage.getItem("token");
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        try {
            const response = await fetch(localStorage.getItem("urlApi") + "api/enigmes/count/" + currentUser.id, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    resetLocalStorage();
                    navigate('/connexion');
                } else {
                    console.error('Erreur HTTP, statut : ' + response.status);
                    throw new Error('Erreur HTTP');
                }
            }

            const data = await response.json();

            data["login"] = currentUser.login;
            data["pourcentageReussite"] = Math.round(data["nombreEnigmesResolues"]*100/data["nombreEnigmes"]);

            setData(data);
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        } finally {
            setLoading(false);
        }
    }

    const afficherPageNouvelleEnigme = async () => {
        navigate('/enigme');
    }

    // Vérification de la connexion
    if(!checkAuthentification()) {
        return <Navigate to="/connexion" replace={true} />;
    } else {
        return (
            <div className="divPrincipale">
                <Header/>
                <div className="divContent">
                    <div className="divViolette">
                        {loading ? (
                            <p>Chargement en cours...</p>
                        ) : (
                            <>
                                {data && (
                                    <>
                                        <h2>Bonjour {data["login"]} !</h2>
                                        <p>Nombre d'énigmes résolues : {data["nombreEnigmesResolues"]}</p>
                                        <p>Nombre d'énigmes total : {data["nombreEnigmes"]}</p>
                                        <p>Pourcentage de réussite : {data['pourcentageReussite']} %</p>
                                        <br/>
                                        <Button intitule="Nouvelle énigme" onClick={() => afficherPageNouvelleEnigme()}/>
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

export default Home;