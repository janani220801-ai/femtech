import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ViewModeProvider } from './context/ViewModeContext.jsx';
import { SmsAlertProvider } from './context/SmsAlertContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <SmsAlertProvider>
          <ThemeProvider>
            <ViewModeProvider>
              <App />
            </ViewModeProvider>
          </ThemeProvider>
        </SmsAlertProvider>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);
