import { makeStyles } from "@material-ui/core/styles";

export const useHomeStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  mainContent: {
    paddingBottom: theme.spacing(2),
    display: "flex",
    height: "60%"
  },
  feedContainer: {
    flex: 2,
    height: "100%"
  },
  filmContainer: {
    flex: 1,
    height: "100%",
    marginLeft: theme.spacing(2)
  }
}));

export const useFeedStyles = makeStyles((theme) => ({
  feedContainer: {
    height: "100%",
    padding: theme.spacing(2)
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

export const useRecentMoviesStyle = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3)
  },
  recentFilmContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: theme.spacing(3)
  },
  recentFilm: {
    position: "relative",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.15)"
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
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: theme.spacing(2)
  },
  thumbnail: {
    marginTop: theme.spacing(3),
    alignSelf: "center"
  },
  ratingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "self-end",
    margin: theme.spacing(1, 0)
  },
  descriptionContainer: {
    textAlign: "justify",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    height: "20vh",
    overflowY: "auto"
  },
  tag: {
    margin: theme.spacing(0.5)
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    alignSelf: "center",
    width: "30%"
  }
}));
