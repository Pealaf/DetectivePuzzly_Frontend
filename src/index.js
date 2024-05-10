import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/';
import Profil from './pages/Profil/';
import NouveauProfil from './pages/NouveauProfil/';
import Enigme from './pages/Enigme/';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/nouveauProfil" element={<NouveauProfil />} />
          <Route path="/enigme" element={<Enigme />} />
          <Route path="/*" element={<Home />}/>
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
);