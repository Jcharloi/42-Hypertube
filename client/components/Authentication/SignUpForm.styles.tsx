import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    margin: `${theme.spacing(2)}px 0px`
  },
  textInput: {
    width: "300px"
  },
  pictureErrorMsg: {
    // same as material-ui Textfiel helperText
    color: theme.palette.error.main,
    marginTop: `${theme.spacing(1)}px`,
    fontSize: "12px"
  },
  circularProgressContainer: {
    position: "relative"
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-20px",
    marginLeft: "-20px"
  }
}));

export default useStyles;
