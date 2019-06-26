import React from "react";
import "./App.css";
import { CssBaseline } from "@material-ui/core";
import { DASDashboard } from "./views/DASDashboard";
import { EdisonThemeProvider, EdisonThemeNames } from "@smartgear/edison";
import { StoreContext } from "redux-react-hook";
import Store from "./store";
import { NotificationProvider } from "./components/Notifications";
import { AppTitleBar } from "./components/AppTitleBar";
import { useLocalStorage } from "./hooks";

const App: React.FC = () => {
  const [themeName, setThemeName] = useLocalStorage<EdisonThemeNames>(
    "selected-theme-name",
    "BrandVilleTheme"
  );

  const onChangeTheme = () => {
    if (themeName === "BrandVilleTheme") {
      setThemeName("SiemensDarkTheme");
    } else {
      setThemeName("BrandVilleTheme");
    }
  };

  return (
    <StoreContext.Provider value={Store}>
      <EdisonThemeProvider theme={themeName}>
        <NotificationProvider />
        <AppTitleBar onChangeTheme={onChangeTheme} />
        <CssBaseline />
        <DASDashboard />
      </EdisonThemeProvider>
    </StoreContext.Provider>
  );
};

export default App;
