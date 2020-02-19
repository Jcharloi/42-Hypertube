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
