import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  containerRecommended: {
    borderLeft: "1px solid grey",
    width: "15%",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      borderTop: "1px solid grey",
      width: "100%",
      height: "70%"
    }
  }
}));

export default useStyles;
