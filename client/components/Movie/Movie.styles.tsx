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
    movieTitleImage: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "90%",
      marginBottom: "1rem"
    },
    containerPresentation: {
      marginTop: "5rem",
      borderRadius: "4px",
      maxWidth: "60%",
      minWidth: "60%",
      padding: "2rem"
    },
    containerMovie: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    labelMovie: {
      marginBottom: "1rem",
      fontSize: "1rem"
    },
    descriptionMovie: {
      maxHeight: "15rem",
      overflow: "auto",
      overflowX: "hidden",
      marginBottom: "1rem",
      paddingRight: "1rem",
      fontSize: "1rem"
    }
  })
);

export default useStyles;
