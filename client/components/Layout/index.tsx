import React, { useState, ReactElement } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { ClickAwayListener, Box } from "@material-ui/core";

import Header from "./Header";
import Filters from "./Filters";

import { ClickAwayEventTarget } from "../../models/models";

import { useLayoutStyles } from "./styles";

interface Props {
  children: ReactElement;
  locale: string;
  setLocale: (locale: string) => void;
}

export const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        "&:hover": {
          background: "#616161"
        }
      }
    }
  },
  palette: {
    background: { default: "#121212", paper: "#212121" },
    // Color from https://htmlcolorcodes.com/color-chart/ (Flat Design)
    primary: {
      // main: "#CCD0D4",
      // contrastText: "#000000"
      main: "#633974",
      light: "#884EA0",
      dark: "#512E5F",
      contrastText: "#ffffff"
    },
    secondary: {
      // main: "#616161",
      // contrastText: "#fffff"
      main: "#F1C40F",
      light: "#F9E79F",
      dark: "#D4AC0D",
      contrastText: "#000000"
    },
    text: {
      primary: "#fff",
      secondary: "#fff"
    }
  }
});

const Layout = ({ children, locale, setLocale }: Props): ReactElement => {
  const classes = useLayoutStyles({});
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onClickAway = (e: ClickAwayEventTarget): void => {
    const id = String(e.target?.id);

    if (!id.includes("menuitem") && !id.includes("body")) {
      setExpandedFilters(false);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.mainContainer}>
        <CssBaseline />
        <Header
          locale={locale}
          setLocale={setLocale}
          onSearchChange={(query): void => setSearchQuery(query)}
          onExpand={(): void => setExpandedFilters(true)}
        />
        <Box className={classes.contentContainer}>
          {expandedFilters && (
            <ClickAwayListener
              onClickAway={(e): void =>
                onClickAway((e as unknown) as ClickAwayEventTarget)
              }
            >
              <Box className={classes.filtersContainer}>
                <Filters searchQuery={searchQuery} />
              </Box>
            </ClickAwayListener>
          )}
          <Box>{children}</Box>
        </Box>
      </div>
    </MuiThemeProvider>
  );
};

export default Layout;
