import React, { ReactElement } from "react";

import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Box from "@material-ui/core/Box";

import TopMenu from "./TopMenu";

import { useLayoutStyles } from "./styles";

interface Props {
  children: ReactElement;
  locale: string;
  setLocale: (locale: string) => void;
}

const Layout = ({ children, locale, setLocale }: Props): ReactElement => {
  const classes = useLayoutStyles({});

  return (
    <>
      <CssBaseline />
      <div className={classes.container}>
        <TopMenu locale={locale} setLocale={setLocale} />
        <Box className={classes.bodyContainer}>{children}</Box>
      </div>
    </>
  );
};

export default Layout;
