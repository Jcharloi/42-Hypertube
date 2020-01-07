import React, { ReactElement } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Box from "@material-ui/core/Box";

import TopMenu from "./TopMenu";

import { useLayoutStyles } from "./styles";

interface Props {
  children: ReactElement;
  locale: string;
  setLocale: (locale: string) => void;
}

export const theme = createMuiTheme({
  palette: {
    background: { default: "#121212", paper: "#212121" },
    primary: {
      main: "#CCD0D4",
      contrastText: "#000000"
    },
    secondary: {
      main: "#616161",
      contrastText: "#ffffff"
    },
    text: {
      primary: "#fff",
      secondary: "#fff"
    }
  }
});

const Layout = ({ children, locale, setLocale }: Props): ReactElement => {
  const classes = useLayoutStyles({});

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.container}>
        <div className={classes.background} />
        <TopMenu locale={locale} setLocale={setLocale} />
        <Box className={classes.bodyContainer}>{children}</Box>
      </div>
    </MuiThemeProvider>
  );
};

export default Layout;
