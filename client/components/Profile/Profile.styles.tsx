import { makeStyles } from "@material-ui/styles";
import { Theme, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  containerProfile: {
    maxWidth: "1000px",
    margin: "50 auto",

    display: "flex",
    justifyContent: "center",

    flexWrap: "wrap"
  },
  containerHistory: {
    flexGrow: 1,
    margin: `0px ${theme.spacing(1)}`,
    overflow: "auto",
    maxWidth: "600px",
    maxHeight: "85vh",
    borderRadius: "8px",
    padding: "15px"
  },
  titleHistory: {
    textAlign: "center"
  },
  containerUser: {
    marginBottom: "10px",
    borderRadius: "8px",
    display: "inline-block",
    maxWidth: "400px",
    padding: `${theme.spacing(3)}px`
  },
  containerPicture: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 100,
    "&:hover": {
      filter: "brightness(80%)",
      changePhoto: {
        display: "none",
        border: "2px solid red",
        cursor: "pointer"
      }
    }
  },
  containerInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  containerComment: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px"
  },
  containerRating: {
    float: "left",
    display: "flex"
  },
  containerMovieInfos: {
    flexWrap: "wrap",
    maxHeight: "45px",
    display: "flex",
    alignItems: "center"
  },
  containerFullname: {
    display: "flex",
    width: "100%",
    maxWidth: "250px",
    justifyContent: "center",
    overflow: "hidden",
    gap: "70%"
  },
  commentDate: {
    marginTop: theme.spacing(0.5),
    color: "grey"
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(35),
    height: theme.spacing(35)
  },
  changePhoto: {
    position: "absolute",
    top: "60px",
    left: "60px"
  },
  textComment: {
    wordBreak: "break-all"
  }
}));
export default useStyles;
