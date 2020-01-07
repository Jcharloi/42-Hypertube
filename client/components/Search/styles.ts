import { makeStyles } from "@material-ui/core/styles";

export const useSearchStyles = makeStyles((theme) => ({
  snackbar: {
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    position: "absolute",
    width: "200px"
  },
  snackbarLoading: {
    bottom: theme.spacing(12),
    right: theme.spacing(0),
    position: "absolute",
    width: "200px"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100%"
  },
  thumbsContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(4),
    paddingBottom: 0,
    overflowY: "scroll",
    overflowX: "hidden",
    paddingRight: "555px",
    zIndex: 1
  },
  filmContainer: {
    flex: theme.spacing(2),
    height: "100%",
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  infoSidebar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing(4)}px 0`,
    position: "sticky",
    width: "200%",
    top: 0,
    zIndex: 1000,
    height: "45px"
  }
}));

export const useFilmStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: theme.spacing(5)
  },
  thumbnail: {
    marginTop: theme.spacing(3),
    alignSelf: "center"
  },
  ratingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "self-end",
    margin: `${theme.spacing(1)} 0`
  },
  descriptionContainer: {
    textAlign: "justify",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    height: "30vh",
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

export const useThumbnailStyles = makeStyles((theme) => ({
  container: {
    cursor: "pointer",
    display: "flex",
    padding: `${theme.spacing(2)}px 0`,
    transformOrigin: "0% 50%",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.15)"
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: theme.spacing(1)
  },
  filmInfo: {
    lineHeight: "initial",
    display: "flex",
    alignItems: "flex-end"
  }
}));
