import { makeStyles } from "@material-ui/styles";
import { Theme, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  containerProfile: {
    // display: "inline-block",
    maxWidth: "1000px",
    margin: "50 auto",
    // padding: "20px"
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  containerHistory: {
    // display: "inline-block",
    flexGrow: 1,
    margin: `0px ${theme.spacing(4)}`,
    overflow: "auto",
    maxWidth: "600px",
    maxHeight: "85vh",
    borderRadius: "8px",
    padding: "15px"
  },
  titleHistory: {
    textAlign: "center"
  },
  containerUser: {
    borderRadius: "8px",
    display: "inline-block",
    maxWidth: "400px",
    padding: `${theme.spacing(3)}px`
  },
  containerPicture: {
    display: "flex",
    justifyContent: "center"
  },
  containerInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(35),
    height: theme.spacing(35)
  }
}));
export default useStyles;
