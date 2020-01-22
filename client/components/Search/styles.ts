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
    alignItems: "center",
    top: 0,
    height: "100%",
    width: "100%",
    margin: theme.spacing(1, 0)
  },
  tag: {
    margin: theme.spacing(0.5)
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
    alignItems: "center",
    width: "100%"
  },
  rating: {
    display: "flex",
    marginBottom: theme.spacing(1)
  },
  watchButton: {
    width: "75%"
  },
  ratingIcon: {
    color: yellow[500]
  },
  altContainer: {
    height: 450,
    width: 300,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  noMediaContainer: {
    textAlign: "center",
    marginTop: theme.spacing(5)
  },
  noMedia: {
    width: "20rem",
    height: "20rem"
  }
}));

export default useSearchStyles;
