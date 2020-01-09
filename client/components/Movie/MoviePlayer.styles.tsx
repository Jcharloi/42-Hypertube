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
  player: {
    cursor: "pointer",
    minWidth: "70%",
    maxWidth: "70%"
  }
}));

export default useStyles;
