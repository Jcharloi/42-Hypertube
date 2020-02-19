import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const signUpPageHeight = "44px";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: theme.spacing(1)
    },
    signUpPage: {
      height: signUpPageHeight,
      padding: theme.spacing(0.5, 3),
      marginTop: theme.spacing(3)
    },
    fakeItem: {
      // It needs to be the same height than `signUpPage` to be centered
      height: signUpPageHeight
    },
    height: {
      height: "100%"
    },
    niceLink: {
      textDecoration: "none"
    },
    signUpButton: {
      marginLeft: theme.spacing(2),
      // Todo: delete css after and use theme with `color="secondary"`
      color: "#F1C40F",
      "&:hover": {
        backgroundColor: "rgba(241,196,15,0.08)"
      }
    },
    signInPage: {
      maxWidth: "500px",
      width: "100%",
      padding: theme.spacing(3, 1),
      margin: theme.spacing(3, 0)
    },
    form: {
      margin: "0px"
    },
    item: {
      marginTop: theme.spacing(4)
    },
    forgotPasswordItem: {
      marginTop: theme.spacing(1),
      alignSelf: "flex-start"
    },
    forgotPasswordButton: {
      textTransform: "none",
      // Todo: delete css after and use theme with `color="secondary"`
      color: "#F1C40F",
      "&:hover": {
        backgroundColor: "rgba(241,196,15,0.08)"
      }
    },
    textInput: {
      width: "300px"
    }
  })
);

export default useStyles;
