import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// This function loads the Google Translate script dynamically
const loadGoogleTranslate = () => {
  const scriptId = 'google-translate-script';

  if (document.getElementById(scriptId)) {
    return;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,kn',
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Call the function to load the widget after the app renders
loadGoogleTranslate();

