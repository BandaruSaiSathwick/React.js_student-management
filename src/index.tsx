import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { StudentProvider } from './context/StudentContext';


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <StudentProvider>
        <App />
      </StudentProvider>
    </React.StrictMode>
  );
}
