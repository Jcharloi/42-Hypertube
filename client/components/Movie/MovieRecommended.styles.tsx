import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid grey",
    width: "30%",
    height: "100%"
  },
  rootResponsive: {
    border: "1px solid grey",
    width: "100%",
    height: "70%"
  }
}));

export default useStyles;
