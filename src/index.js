import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/';
import Connexion from './pages/Connexion/';
import Inscription from './pages/Inscription/';
import Enigme from './pages/Enigme/';
import Statistiques from "./pages/Statistiques";
import MonCompte from "./pages/MonCompte";
import './styles/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { Analytics } from "@vercel/analytics/react";

library.add(fas, faTwitter, faFontAwesome)

// Stockage de l'url de l'api
localStorage.setItem('urlApi', 'https://api.detectivepuzzly.xyz/');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Analytics />
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/enigme" element={<Enigme />} />
            <Route path="/statistiques" element={<Statistiques />} />
            <Route path="/moncompte" element={<MonCompte />} />
            <Route path="/*" element={<Home />}/>
        </Routes>
    </Router>
);