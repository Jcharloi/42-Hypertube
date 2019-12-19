import React, { ReactElement } from "react";
import Grid from "@material-ui/core/Grid";

import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

import TopMenu from "./TopMenu";

interface Props {
  children: ReactElement;
  locale: string;
  setLocale: (locale: string) => void;
}

const Layout = ({ children, locale, setLocale }: Props): ReactElement => (
  <Grid container direction="column" style={{ minHeight: "100%" }}>
    <CssBaseline />
    <Grid item>
      <TopMenu locale={locale} setLocale={setLocale} />
    </Grid>
    {/* If you want `children` to take all the height, just add `flex-grow: 1` to the first div */}
    {children}
  </Grid>
);

export default Layout;
