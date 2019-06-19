// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';

import { SnackbarProvider } from 'notistack';
import { NotificationContainer } from './NotificationContainer';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
}));

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
