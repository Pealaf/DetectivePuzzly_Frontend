import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/';
import Connexion from './pages/Connexion/';
import Inscription from './pages/Inscription/';
import Enigme from './pages/Enigme/';
import Statistiques from "./pages/Statistiques";
import './styles/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFontAwesome)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/enigme" element={<Enigme />} />
            <Route path="/statistiques" element={<Statistiques />} />
            <Route path="/*" element={<Home />}/>
        </Routes>
    </Router>
);