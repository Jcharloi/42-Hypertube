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
    type: "dark",
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
