import Header from "../../components/Header";
import {checkAuthentification, resetLocalStorage} from "../../utils/utilsFunctions";
import {Navigate, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Tableau from "../../components/Tableau";

function Statistiques() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const listeTh = ["Utilisateur", "Énigmes résolues"];

    useEffect(() => {
        setLoading(true);
        getStats();
    }, [navigate]);

    const getStats = async () => {
        let token = localStorage.getItem("token");

        try {
            const response = await fetch(localStorage.getItem("urlApi") + "api/users/get/top", {
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
            setData(data);
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        } finally {
            setLoading(false);
        }
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
                        <h2>Classement des 5 meilleurs joueurs</h2>
                        {loading ? (
                            <p>Chargement en cours...</p>
                        ) : (
                            <>
                                {data && (
                                    <Tableau listeTh={listeTh} data={data}/>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Statistiques;