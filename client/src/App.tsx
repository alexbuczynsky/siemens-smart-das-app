import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { DASConfigurationCard } from './components/DASConfigurationCard';




const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <CssBaseline />
        <DASConfigurationCard />
      </header>
    </div>
  );
}

export default App;