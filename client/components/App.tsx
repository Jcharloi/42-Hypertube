import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { hot } from "react-hot-loader/root";
import { Router, Switch, Route } from "react-router-dom";

import history from "../helpers/history";

import enTranslation from "../translations/en.json";
import frTranslation from "../translations/fr.json";

import CustomRoute from "./Routes/CustomRoute";
import Layout from "./Layout";
import Home from "./Home";
import Movie from "./Movie/Movie";
import Search from "./Search";
import FourOhFour from "./FourOhFour";
import SignUp from "./Authentication/SignUp";
import ResetPassword from "./Authentication/ResetPassword";
import Error from "./Error";

import useLocaleStorage from "../hooks/useLocaleStorage";

const messages: Record<string, Record<string, string>> = {
  en: enTranslation,
  fr: frTranslation
};

const App = (): ReactElement => {
  const [localStorageData, setItem] = useLocaleStorage();
  if (!localStorageData.language) {
    setItem("language", "en");
  }

  return (
    <IntlProvider
      locale={localStorageData.language}
      messages={messages[localStorageData.language]}
    >
      <Router history={history}>
        <Layout
          locale={localStorageData.language}
          setLocale={(locale: string): void => setItem("language", locale)}
        >
          <Switch>
            <CustomRoute
              exact
              path="/sign-up"
              component={SignUp}
              requireAuth={false}
            />
            <CustomRoute
              exact
              path="/reset-password"
              component={ResetPassword}
              requireAuth={false}
            />
            <CustomRoute path="/shows" component={Search} requireAuth />
            <CustomRoute path="/movies" component={Search} requireAuth />
            <CustomRoute path="/movie" component={Movie} requireAuth />
            <Route exact path="/error" component={Error} requiredAuth />
            <Route exact path="/" component={Home} />
            <Route component={FourOhFour} />
          </Switch>
        </Layout>
      </Router>
    </IntlProvider>
  );
};

export default hot(App);
