import { makeStyles } from "@material-ui/core/styles";

export const useSearchStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100%"
  },
  thumbsContainer: {
    position: "relative",
    display: "flex",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    flex: 4,
    padding: theme.spacing(2),
    paddingTop: 0,
    marginBottom: theme.spacing(2),
    overflowY: "scroll",
    overflowX: "hidden"
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
  card: {
    width: "100%",
    minHeight: "204px",
    marginBottom: theme.spacing(2)
  },
  cardHeader: {
    textAlign: "center"
  },
  media: {
    height: 140
  }
}));

export default {
  useFilmStyles,
  useThumbnailStyles
};
