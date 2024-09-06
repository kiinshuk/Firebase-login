import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot instead of ReactDOM.render
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Find the root DOM element
const rootElement = document.getElementById('root');

// Create the root using createRoot
const root = createRoot(rootElement);

// Render the app with BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
