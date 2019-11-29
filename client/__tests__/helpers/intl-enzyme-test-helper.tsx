/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * locale intl context around them of the language of your choice
 */
import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import Adapter from "enzyme-adapter-react-16";
import {
  configure,
  mount,
  shallow,
  ReactWrapper,
  ShallowWrapper
} from "enzyme";

import enTranslation from "../../translations/en.json";
import frTranslation from "../../translations/fr.json";

configure({ adapter: new Adapter() });

const messages: Record<string, Record<string, string>> = {
  en: enTranslation,
  fr: frTranslation
};

export const mountWithIntl = (
  node: ReactElement,
  locale: string
): ReactWrapper => {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      messages: messages[locale],
      locale
    }
  });
};

// Doesn't work, I don't understand why
// I followed instruction here: https://github.com/formatjs/react-intl/blob/master/docs/Testing-with-React-Intl.md#helper-function-1
export const shallowWithIntl = (
  node: ReactElement,
  locale: string
): ShallowWrapper => {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      messages: messages[locale],
      locale
    }
  });
};
