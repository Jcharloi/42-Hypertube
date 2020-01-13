import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";

const signUpPageHeight = "44px";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signUpPage: {
      height: signUpPageHeight,
      padding: `${theme.spacing(0.5)}px ${theme.spacing(3)}px`,
      // Using indigo for now bevause we're using material default's theme
      // todo: change and use theme in the future
      backgroundColor: indigo[50]
    },
    fakeItem: {
      // It needs to be the same height to be centered
      height: signUpPageHeight
    },
    height: {
      height: "100%"
    },
    niceLink: {
      textDecoration: "none"
    },
    signUpButton: {
      marginLeft: `${theme.spacing(2)}px`
    },
    signInPage: {
      maxWidth: "500px",
      width: "100%",
      // padding: `${theme.spacing(3)}px`,
      margin: `${theme.spacing(3)}px 0px`,
      // Using indigo for now bevause we're using material default's theme
      // todo: change and use theme in the future
      backgroundColor: indigo[50]
    },
    item: {
      marginTop: `${theme.spacing(4)}px`
    },
    forgotPasswordItem: {
      marginTop: `${theme.spacing(1)}px`,
      alignSelf: "flex-start"
    },
    forgotPasswordButton: {
      textTransform: "none"
    },
    textInput: {
      width: "300px"
    }
  })
);

export default useStyles;
