import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { DASDashboard } from './views/DASDashboard';
import { EdisonThemeProvider } from '@smartgear/edison';
import { StoreContext } from 'redux-react-hook';
import Store from './store';
import { NotificationProvider } from './components/Notifications';
import { AppTitleBar } from './components/AppTitleBar';




const App: React.FC = () => {

  return (
    <StoreContext.Provider value={Store}>
      <EdisonThemeProvider theme="BrandVilleTheme">
        <NotificationProvider />
        <AppTitleBar />
        <CssBaseline />
        <DASDashboard />
      </EdisonThemeProvider>
    </StoreContext.Provider>
  );
}

export default App;
