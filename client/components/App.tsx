import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { hot } from 'react-hot-loader/root';

import Layout from './Layout';

import enTranslation from '../translations/en.json';
import frTranslation from '../translations/fr.json';

const messages = {
  fr: frTranslation,
  en: enTranslation,
};

const App = (): ReactElement => {
  const [locale, setLocale] = React.useState('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout locale={locale} setLocale={setLocale}>
        <div>
          Hello world ajoutez des routes ici
        </div>
      </Layout>
    </IntlProvider>
  );
};

export default hot(App);
