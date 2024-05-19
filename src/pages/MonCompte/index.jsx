import React, {useEffect, useState} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Navigate, useNavigate} from 'react-router-dom';
import {checkAuthentification, resetLocalStorage} from "../../utils/utilsFunctions";
import Header from "../../components/Header";

function MonCompte() {

    const [login, setLogin] = useState('');
    const [oldPpassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        getLogin();
    }, [navigate]);

    const getLogin = () => {
        if(checkAuthentification()) {
            let currentUser = JSON.parse(localStorage.getItem("currentUser"));
            setLogin(currentUser.login);
        }
    }

    const checkOldPassword = async () => {
        let messageErreur = document.getElementById("labelErreur");
        let messageSucces = document.getElementById("labelSucces");
        if (newPassword.length >= 8) {
            if (newPassword === confirmationPassword && newPassword) {
                await updatePassword();
            } else {
                messageErreur.textContent = "Le nouveau mot de passe et la confirmation du mot de passe doivent être identiques.";
                messageErreur.style.display = "block";
                messageSucces.style.display = "none";
            }
        } else {
            messageErreur.textContent = "Le nouveau mot de passe doit faire 8 caractères minimum.";
            messageErreur.style.display = "block";
            messageSucces.style.display = "none";
        }
    }

    const updatePassword = async () => {
        let messageErreur = document.getElementById("labelErreur");
        let messageSucces = document.getElementById("labelSucces");

        let token = localStorage.getItem("token");
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        let donnees = {
            "oldPassword": oldPpassword,
            "newPassword": newPassword
        };

        try {
            const response = await fetch(localStorage.getItem("urlApi") + "api/users/updatePassword/" + currentUser.id, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token
                },
                body: JSON.stringify(donnees),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    resetLocalStorage();
                    navigate('/connexion');
                } else if (response.status === 500) {
                    messageSucces.style.display = "none";
                    messageErreur.textContent = "L'ancien mot de passe est incorrect.";
                    messageErreur.style.display = "block";
                } else {
                    console.error('Erreur HTTP, statut : ' + response.status);
                    throw new Error('Erreur HTTP');
                }
            } else {
                messageErreur.style.display = "none";
                messageSucces.style.display = "block";
            }
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        } finally {
            setLoading(false);
        }
    }

    const askConfirmation = async() => {
        const userConfirmed = window.confirm("Voulez-vous vraiment supprimer votre compte ?\n(Toutes vos données seront perdues)");
        if (userConfirmed) {
            await deleteUser();
        }
    }

    const deleteUser = async() => {
        let token = localStorage.getItem("token");
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        try {
            const response = await fetch(localStorage.getItem("urlApi") + "api/users/" + currentUser.id, {
                method: "DELETE",
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

            resetLocalStorage();
            navigate('/connexion');

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
                        {loading ? (
                            <p>Chargement en cours...</p>
                        ) : (
                            <>
                                {login && (
                                    <>
                                        <h2>Mon compte</h2>
                                        <br/>
                                        <label id="labelSucces" hidden style={{color: 'lightgreen', fontWeight: "bold"}}>Votre mot de passe a bien été mis à jour.</label>
                                        <br/>
                                        <label>Login : {login}</label>
                                        <br/>
                                        <Input type="password" name="oldPassword" placeholder="Ancien mot de passe" value={oldPpassword}
                                               setValue={setOldPassword}/>
                                        <br/>
                                        <Input type="password" name="newPassword" placeholder="Nouveau mot de passe" value={newPassword}
                                               setValue={setNewPassword}/>
                                        <br/>
                                        <Input type="password" name="confirmationPassword" placeholder="Confirmation du mot de passe"
                                               value={confirmationPassword} setValue={setConfirmationPassword}/>
                                        <br/>
                                        <label id="labelErreur" hidden style={{color: 'darkred', fontWeight: "bold"}}></label>
                                        <br/>
                                        <br/>
                                        <Button intitule="Modifier mon mot de passe" onClick={checkOldPassword} />
                                        <br/>
                                        <hr/>
                                        <br/>
                                        <Button intitule="Supprimer mon compte" onClick={askConfirmation} />
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

export default MonCompte;