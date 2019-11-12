import * as React from "react";
import { IntlProvider, useIntl } from "react-intl";
import { hot } from 'react-hot-loader/root';

import enTranslation from "./translations/en.json";
import frTranslation from "./translations/fr.json";

const messages = {
  fr: frTranslation,
  en: enTranslation,
};

const App = () => {
  const [locale, setLocale] = React.useState("en");
  
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
        Hello world ajoutez des routes ici
    </IntlProvider>
  )
};

export default hot(App);
