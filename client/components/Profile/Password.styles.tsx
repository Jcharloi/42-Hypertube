import { makeStyles } from "@material-ui/styles";
import { Theme, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: "255px",
    marginBottom: theme.spacing(2)
  },
  goodMessage: {
    color: "green"
  },
  badMessage: {
    color: "red"
  }
}));

export default useStyles;