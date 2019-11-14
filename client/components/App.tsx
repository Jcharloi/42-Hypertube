import React, { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { hot } from 'react-hot-loader/root';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../helpers/history';

import enTranslation from '../translations/en.json';
import frTranslation from '../translations/fr.json';

import CustomRoute from './Routes/CustomRoute';

import Layout from './Layout';
import Authentification from './Authentification/Authentification';
import Home from './Home/Home';


const messages: Record<string, Record<string, string>> = {
  en: enTranslation,
  fr: frTranslation,
};

const App = (): ReactElement => {
  const [locale, setLocale] = React.useState('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout>
        <div>
        Hello world ajoutez des routes ici
        </div>
      </Layout>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            component={Authentification}
            requireAuth={false}
          />
          <CustomRoute
            exact
            path="/sign-in"
            component={Authentification}
            requireAuth={false}
          />
          <CustomRoute
            exact
            path="/sign-up"
            component={Authentification}
            requireAuth={false}
          />
          <CustomRoute
            exact
            path="/reset-password"
            component={Authentification}
            requireAuth={false}
          />
          <CustomRoute
            exact
            path="/home"
            component={Home}
            requireAuth
          />
        </Switch>
      </Router>
    </IntlProvider>
  );
};

export default hot(App);
