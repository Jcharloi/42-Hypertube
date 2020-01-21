import { makeStyles } from "@material-ui/core/styles";

export const useHomeStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3)
  },
  header: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  mainContent: {
    paddingBottom: theme.spacing(3),
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap"
    }
  },
  feedContainer: {
    flex: 2,
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
      marginBottom: theme.spacing(3)
    }
  },
  filmContainer: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  dataContainer: {
    width: "15%",
    marginLeft: theme.spacing(3),
    height: "100%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  subContent: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap"
    }
  },
  recentVideosContainer: {
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
      marginBottom: theme.spacing(3)
    }
  },
  infosContainer: {
    display: "flex",
    padding: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
}));

export const useFeedStyles = makeStyles((theme) => ({
  feedContainer: {
    height: "100%",
    padding: theme.spacing(3)
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary
    }
  },
  thumbnail: {
    width: 90,
    height: 135
  },
  recentFeedContainer: {
    display: "flex",
    padding: theme.spacing(1)
  },
  infos: {
    marginLeft: theme.spacing(1)
  },
  header: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));

export const useRecentMediasStyle = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3)
  },
  recentFilmContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2, 0),
    flexWrap: "wrap"
  },
  recentFilm: {
    margin: theme.spacing(0, 8),
    position: "relative",
    transition: "transform 0.2s",
    width: 90,
    height: 135,
    "&:hover": {
      transform: "scale(1.15)"
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2)
    }
  },
  recentFilmTitle: {
    color: theme.palette.text.primary,
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    zIndex: 10,
    transition: "background 0.2s, opacity 0.2s",
    "&:hover": {
      opacity: 1,
      background: "rgba(0,0,0,0.75)"
    }
  }
}));

export const useFilmStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  posterContainer: {
    display: "flex",
    alignItems: "center",
    width: 375,
    height: 562.5,
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      width: 300,
      height: 450
    }
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  descriptionContainer: {
    textAlign: "justify",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    height: "20vh",
    overflowY: "auto",
    flexGrow: 1
  },
  tag: {
    margin: theme.spacing(0.5)
  },
  buttonContainer: {
    marginTop: theme.spacing(3),
    alignSelf: "center",
    width: "100%"
  },
  infosOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    opacity: 0,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 0.9
    }
  }
}));
