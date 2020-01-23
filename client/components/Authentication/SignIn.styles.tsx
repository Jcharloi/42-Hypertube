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
    }
  })
);

export default useStyles;
