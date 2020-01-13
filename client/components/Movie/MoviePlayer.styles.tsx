import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  containerPlayer: {
    marginTop: "5rem",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxHeight: "30%"
  },
  player: {
    minWidth: "70%",
    maxWidth: "70%"
  }
}));

export default useStyles;
