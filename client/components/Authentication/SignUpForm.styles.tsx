import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    margin: "0px"
  },
  item: {
    margin: theme.spacing(2, 0)
  },
  textInput: {
    width: "300px"
  },
  pictureErrorMsg: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
    fontSize: "12px"
  },
  sendButton: {
    // Todo: use theme color when we've define them
    // background: `linear-gradient(110deg, ${theme.palette.primary.light} 20%, ${theme.palette.primary.dark} 90%)`,
    background: `linear-gradient(110deg, rgba(136,78,160,1) 20%, rgba(81, 46, 95,1) 90%)`,
    boxShadow: "0 3px 5px 2px rgba(99,57,116,.3)",
    color: "white",
    "z-index": 1,
    // ::before to make the nice hover transition
    "&::before": {
      borderRadius: "4px",
      content: '""',
      background:
        "linear-gradient(110deg, rgba(102,59,120,1) 20%, rgba(59,34,69,1) 90%)",
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: "0",
      transition: "opacity 1s",
      "z-index": "-1"
    },
    "&:hover::before": {
      opacity: 1
    }
  },
  // Todo: delete `pictureButton` and use theme with `color="secondary"`
  pictureButton: {
    color: "#F1C40F",
    borderColor: "#F1C40F",
    "&:hover": {
      backgroundColor: "rgba(241,196,15,0.08)"
    }
  }
}));

export default useStyles;
