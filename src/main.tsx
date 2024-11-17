import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CoreAdminProvider } from './contexts/CoreAdminContext';
import { PatientProvider } from './contexts/PatientContext';
import { TherapySettingsProvider } from './contexts/TherapySettingsContext';
import { TreatmentTemplatesProvider } from './contexts/TreatmentTemplatesContext';
import { TreatmentRemindersProvider } from './contexts/TreatmentRemindersContext';
import { ReminderSettingsProvider } from './contexts/ReminderSettingsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CoreAdminProvider>
        <AuthProvider>
          <PatientProvider>
            <TherapySettingsProvider>
              <TreatmentTemplatesProvider>
                <TreatmentRemindersProvider>
                  <ReminderSettingsProvider>
                    <App />
                  </ReminderSettingsProvider>
                </TreatmentRemindersProvider>
              </TreatmentTemplatesProvider>
            </TherapySettingsProvider>
          </PatientProvider>
        </AuthProvider>
      </CoreAdminProvider>
    </BrowserRouter>
  </StrictMode>
);