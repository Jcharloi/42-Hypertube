import React, { useState, ReactElement } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { ClickAwayListener, Box } from "@material-ui/core";

import Header from "./Header";
import Filters from "./Filters";

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
      main: "#CCD0D4",
      contrastText: "#000000"
      // Uncoment to have some color
      // main: "#633974",
      // light: "#884EA0",
      // dark: "#512E5F",
      // contrastText: "#ffffff"
    },
    secondary: {
      main: "#616161",
      contrastText: "#ffffff"
      // Uncoment to have some color
      // main: "#F1C40F",
      // light: "#F9E79F",
      // dark: "#D4AC0D",
      // contrastText: "#000000"
    },
    text: {
      primary: "#fff",
      secondary: "#fff"
    }
  }
});

const Layout = ({ children, locale, setLocale }: Props): ReactElement => {
  const classes = useLayoutStyles({});
  const location = useLocation();
  const { query: searchQueryParam } = qs.parse(location.search.slice(1));
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchQueryParam || "");
  const [mediaType, setMediaType] = useState(
    location.pathname.includes("movies") ? "movies" : "shows"
  );

  const handleClickAway = (e: React.MouseEvent<EventTarget>): void => {
    const target = e.target as HTMLElement;
    const { id } = target;

    if (
      !id.includes("menuitem") &&
      !target.children.namedItem("menuitem-search") && // Check if it's search input's wrapper
      !id.includes("body")
    ) {
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
          searchQuery={searchQuery}
          onSearchChange={(query): void => setSearchQuery(query)}
          onExpandFilters={(): void => setExpandedFilters(true)}
          onMediaTypeChange={(newMediaType): void => setMediaType(newMediaType)}
          mediaType={mediaType}
        />
        <Box className={classes.contentContainer}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              className={classes.filtersContainer}
              style={expandedFilters ? {} : { display: "none" }}
            >
              <Filters
                searchQuery={searchQuery}
                mediaType={mediaType}
                onReset={(): void => setSearchQuery("")}
              />
            </Box>
          </ClickAwayListener>

          <Box>{children}</Box>
        </Box>
      </div>
    </MuiThemeProvider>
  );
};

export default Layout;
