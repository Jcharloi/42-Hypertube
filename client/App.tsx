import * as React from "react";

import { useIntl } from "react-intl";

interface Props {
  setLocale: (locale: string) => void;
}

const App = ({ setLocale }: Props) => {
  const t = useIntl();

  return <div>{t.formatMessage({ id: "helloworld" })}</div>;
};

export default App;
