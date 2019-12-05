import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      color: "#888888",
      backgroundColor: "#060606"
    },
    rootResponsive: {
      display: "flex",
      flexDirection: "column",
      height: "150%",
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
      border: "1px solid yellow"
    },
    movieContainerResponsive: {
      width: "100%",
      height: "100%",
      border: "1px solid yellow"
    }
  })
);

export default useStyles;
