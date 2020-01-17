import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  containerPlayer: {
    marginTop: "5rem",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxHeight: "50%",
    minHeight: "50%"
  },
  playerBroken: {
    display: "flex",
    height: "100%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center"
  },
  video: {
    width: "60%"
  },
  playerLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "100%",
    backgroundColor: "black"
  },
  playerIcon: {
    fontSize: "7rem",
    cursor: "pointer"
  }
}));

export default useStyles;
