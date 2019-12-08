import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      height: "150%",
      color: "#888888",
      backgroundColor: "#060606"
    },
    rootResponsive: {
      display: "flex",
      flexDirection: "column",
      height: "200%",
      color: "#888888",
      backgroundColor: "#060606"
    },
    movieDoesNotExists: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "70%"
    },
    movieDoesNotExistsResponsive: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "50%"
    },
    movieContainer: {
      width: "70%",
      border: "1px solid yellow",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column"
    },
    movieContainerResponsive: {
      width: "100%",
      height: "100%",
      border: "1px solid yellow",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column"
    },
    backgroundMovie: {
      width: "70%",
      height: "20%",
      objectFit: "cover"
    },
    containerPresentation: {
      backgroundColor: "#151515",
      borderRadius: "4px",
      maxWidth: "60%",
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
    }
  })
);

export default useStyles;
