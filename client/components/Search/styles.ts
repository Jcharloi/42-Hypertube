import { makeStyles } from "@material-ui/core/styles";

export const useSearchStyles = makeStyles((theme) => ({
  snackbar: {
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    position: "fixed",
    width: "200px"
  },
  snackbarLoading: {
    bottom: theme.spacing(5),
    right: theme.spacing(0),
    position: "fixed",
    width: "200px"
  },
  thumbsContainer: {
    border: "3px solid red",
    overflow: "auto",
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(4),
    paddingBottom: 0,
    zIndex: 0
  }
}));

export const useFilmStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
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
      transform: "scale(1.15)",
      backgroundColor: "rgba(255, 255, 255, 0.1)"
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
