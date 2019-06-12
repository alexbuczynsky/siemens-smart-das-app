import React, { useState, useEffect } from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { DASConfigurationCard } from './components/DASConfigurationCard';
import { BreakerSetupObject } from './models';
import { smartAPI } from './services/configured-services';




const App: React.FC = () => {

  const [breakerSetup, setBreakerSetup] = useState<BreakerSetupObject[]>([])

  useEffect(() => {
    smartAPI
      .getBreakerConfig()
      .then(config => {
        setBreakerSetup(config.map(x => new BreakerSetupObject(x)));
      })
      .catch(err => {
        // alert(err.message)
        console.error(err)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <CssBaseline />
        <DASConfigurationCard configuration={breakerSetup} />
      </header>
    </div>
  );
}

export default App;
