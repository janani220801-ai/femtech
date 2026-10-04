import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ViewModeProvider } from './context/ViewModeContext.jsx';
import { SmsAlertProvider } from './context/SmsAlertContext.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
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
    </ErrorBoundary>
  </React.StrictMode>
);
