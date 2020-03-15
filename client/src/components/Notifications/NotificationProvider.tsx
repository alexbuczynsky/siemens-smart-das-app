// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';

import { SnackbarProvider } from 'notistack';
import { NotificationContainer } from './NotificationContainer';

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export interface NotificationProviderProps { }

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const NotificationProvider: React.FC<NotificationProviderProps> = () => (
  <SnackbarProvider maxSnack={6}>
    <NotificationContainer />
  </SnackbarProvider>
);
