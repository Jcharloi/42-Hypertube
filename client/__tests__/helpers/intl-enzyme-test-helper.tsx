/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * locale intl context around them of the language of your choice
 */
import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, ReactWrapper } from "enzyme";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";

import enTranslation from "../../translations/en.json";
import frTranslation from "../../translations/fr.json";

configure({ adapter: new Adapter() });

interface Props {
  children: ReactElement;
  locale: string;
}

const messages: Record<string, Record<string, string>> = {
  en: enTranslation,
  fr: frTranslation
};

const theme = createMuiTheme({});

const WrappingComponents = ({ children, locale }: Props): ReactElement => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </IntlProvider>
);

export const mountWithIntl = (
  node: ReactElement,
  locale: string
): ReactWrapper => {
  return mount(node, {
    wrappingComponent: WrappingComponents,
    wrappingComponentProps: {
      messages: messages[locale],
      locale
    }
  });
};

export default mountWithIntl;
