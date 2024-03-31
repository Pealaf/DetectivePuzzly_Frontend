import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/';
import Profil from './pages/Profil/';
import Survey from './pages/Survey/';
import ClientForm from './components/ClientForm';
import ApiTest from './components/ApiTest';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />}></Route>
          <Route path="/survey" element={<Survey />}>
            <Route path="client" element={<ClientForm />} />
            <Route path="freelance" element={<ApiTest />} />
          </Route>
          <Route path="/*" element={<Home />}/>
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
);