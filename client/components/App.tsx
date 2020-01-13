import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { hot } from "react-hot-loader/root";
import { Router, Switch, Route, Link } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import history from "../helpers/history";

import enTranslation from "../translations/en.json";
import frTranslation from "../translations/fr.json";

import CustomRoute from "./Routes/CustomRoute";
import Layout from "./Layout";
import Authentication from "./Authentication/Authentication";
import Profile from "./Profile/Profile";
import Home from "./Home/Home";
import Movie from "./Movie/Movie";
import Search from "./Search";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#FFC689",
      contrastText: "#000000"
    },
    secondary: {
      main: "#616161",
      contrastText: "#ffffff"
    }
  }
});

const messages: Record<string, Record<string, string>> = {
  en: enTranslation,
  fr: frTranslation
};

const App = (): ReactElement => {
  const [locale, setLocale] = React.useState("en");

  return (
    <MuiThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Router history={history}>
          <Layout locale={locale} setLocale={setLocale}>
            <Switch>
              <CustomRoute
                exact
                path="/sign-in"
                component={Authentication}
                requireAuth={false}
              />
              <CustomRoute
                exact
                path="/sign-up"
                component={Authentication}
                requireAuth={false}
              />
              <CustomRoute
                exact
                path="/reset-password"
                component={Authentication}
                requireAuth={false}
              />
              <CustomRoute
                exact
                path="/profile"
                component={Profile}
                requireAuth
              />
              <Route path="/search" component={Search} />
              <CustomRoute path="/movie" component={Movie} requireAuth />
              <Route exact path="/" component={Home} />
              <Route
                component={(): ReactElement => (
                  <div>
                    Not found, go to <Link to="/">root</Link>
                  </div>
                )}
              />
            </Switch>
          </Layout>
        </Router>
      </IntlProvider>
    </MuiThemeProvider>
  );
};

export default hot(App);
