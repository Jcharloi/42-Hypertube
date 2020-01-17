import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      height: "100%",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column"
      }
    },
    movieDoesNotExists: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "70%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "50%"
      }
    },
    movieContainer: {
      width: "85%",
      overflowX: "hidden",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("md")]: {
        width: "100%"
      }
    },
    containerPresentation: {
      marginTop: "5rem",
      borderRadius: "4px",
      maxWidth: "50%",
      minWidth: "50%",
      padding: "2rem",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "80%",
        minWidth: "80%"
      }
      // border: "2px solid blue"
    },
    containerMovie: {
      display: "flex"
      // border: "2px solid red"
    },
    moviePoster: {
      width: "40%",
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    },
    generalInfos: {
      fontSize: "1rem",
      // border: "2px solid green",
      width: "100%",
      marginLeft: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around"
    },
    movieTitle: {
      fontSize: "1.5rem"
    },
    descriptionMovie: {
      maxHeight: "15rem",
      overflow: "auto",
      overflowX: "hidden",
      margin: "1rem",
      maxWidth: "95%"
    },
    dateAndTime: {
      display: "flex",
      width: "95%",
      justifyContent: "space-around",
      [theme.breakpoints.down("lg")]: {
        flexDirection: "column",
        alignItems: "center"
      }
    }
  })
);

export default useStyles;
