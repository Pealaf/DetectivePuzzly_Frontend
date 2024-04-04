import { Outlet } from 'react-router';
import {Link, useNavigate} from 'react-router-dom';
import CheckAuthentification from "../Profil/checkAuthentification";
import React from "react";

function Survey() {

    const navigate = useNavigate();

    const deconnexion = () => {
        localStorage.removeItem('token');
        navigate('/survey');
    };

    return (
        <div>
            <div>
                {CheckAuthentification()}
            </div>
            <div>
                <h1>Questionnaire 🧮</h1>
                <Link to="client">Questionnaire Client</Link>
                <Link to="freelance">Questionnaire Freelance</Link>
                <Outlet />
                <button onClick={deconnexion}>Déconnexion</button>
            </div>
        </div>
    );
}
export default Survey;