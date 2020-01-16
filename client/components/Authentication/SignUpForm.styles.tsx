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
  sendButton: {
    background: `linear-gradient(110deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
    "z-index": 1,
    // ::before to make the nice hover transition
    "&::before": {
      borderRadius: "4px",
      content: '""',
      background:
        "linear-gradient(110deg, rgba(102,59,120,1) 0%, rgba(59,34,69,1) 100%)",
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: "0",
      transition: "opacity 1s",
      "z-index": "-1"
    },
    "&:hover::before": {
      opacity: 1,
      color: "red"
    }
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
