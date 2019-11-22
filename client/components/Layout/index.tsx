import React, { ReactElement } from "react";

import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

import TopMenu from "./TopMenu";

interface Props {
  children: ReactElement;
  locale: string;
  setLocale: (locale: string) => void;
}

const Layout = ({ children, locale, setLocale }: Props): ReactElement => (
  <div>
    <TopMenu locale={locale} setLocale={setLocale} />
    {children}
  </div>
);

export default Layout;
