import * as React from "react";
import * as ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";

import App from "./App";
import { AppContainer } from "react-hot-loader";

import enTranslation from "./translations/en.json";
import frTranslation from "./translations/fr.json";

const messages = {
  fr: frTranslation,
  en: enTranslation
};

const Root = () => {
  const [locale, setLocale] = React.useState("en");

  return (
    <AppContainer>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App setLocale={setLocale} />
      </IntlProvider>
    </AppContainer>
  );
};

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById("root"));
};

render(Root);

if (module.hot) {
  module.hot.accept("./App", () => {
    render(Root);
  });
}
