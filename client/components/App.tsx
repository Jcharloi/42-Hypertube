import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { hot } from "react-hot-loader/root";
import { Router, Switch, Route, Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import history from "../helpers/history";

import enTranslation from "../translations/en.json";
import frTranslation from "../translations/fr.json";

import CustomRoute from "./Routes/CustomRoute";
import Layout from "./Layout";
import Authentication from "./Authentication/Authentication";
import Home from "./Home/Home";
import Movie from "./Movie/Movie";
import Search from "./Search";

export const theme = createMuiTheme({
  palette: {
    type: "dark"
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
      <CssBaseline />
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout locale={locale} setLocale={setLocale}>
          <Router history={history}>
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
          </Router>
        </Layout>
      </IntlProvider>
    </MuiThemeProvider>
  );
};

export default hot(App);
