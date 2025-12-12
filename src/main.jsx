import React from 'react';
import ReactDOM from 'react-dom/client';
import RepasseMedicoApp from './RepasseMedicoApp.jsx';
import './index.css'; // se tu tiver Tailwind ou estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RepasseMedicoApp />
  </React.StrictMode>
);
