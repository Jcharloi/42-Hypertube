import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  circularProgressContainer: {
    position: "relative"
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-20px",
    marginLeft: "-20px",
    zIndex: 2
  }
}));

export default useStyles;
