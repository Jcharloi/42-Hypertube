import { makeStyles } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";

const useSearchStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  thumbnailContainer: {
    position: "relative",
    height: "450px",
    width: "300px",
    margin: theme.spacing(5),
    transition: "transform 0.2s",
    "&:hover": {
      [theme.breakpoints.up("sm")]: {
        transform: "scale(1.15)"
      }
    }
  },
  thumbnailOverlay: {
    textAlign: "center",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: 0,
    height: "100%",
    width: "100%",
    padding: theme.spacing(2, 1),
    alignItems: "center",
    transition: "background 0.2s, opacity 0.2s, transform 0.2s",
    opacity: 0,
    "&:hover": {
      opacity: 1,
      background: "rgba(0,0,0,0.8)"
    }
  },
  skeletonThumbnail: {
    background: theme.palette.secondary.main
  },
  skeletonProgress: {
    position: "absolute",
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
    padding: theme.spacing(2, 0),
    transformOrigin: "0% 50%",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.15)",
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    alignItems: "center",
    top: 0,
    width: "100%",
    height: "100%"
  },
  summary: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 1),
    flexGrow: 1,
    overflow: "auto",
    textAlign: "justify"
  },
  metaInfos: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  rating: {
    display: "flex",
    marginBottom: theme.spacing(1)
  },
  ratingIcon: {
    color: yellow[500]
  },
  tag: {
    margin: theme.spacing(0.5)
  }
}));

export default useSearchStyles;
