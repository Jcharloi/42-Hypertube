import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: "650px",
      flexGrow: 1,
      alignSelf: "flex-start",
      margin: theme.spacing(3, 1),
      padding: theme.spacing(0.5)
    },
    titles: {
      margin: theme.spacing(3, 0, 5),
      alignItems: "center",
      flexDirection: "column"
    },
    subtitle: {
      marginTop: theme.spacing(1)
    },
    emailRound: {
      width: "80px",
      height: "80px",
      // todo: use theme in the futur, like this:
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: "#633974",
      margin: theme.spacing(3)
    },
    emailIcon: {
      fontSize: "50px",
      color: theme.palette.text.primary
    },
    randomWrapper: {
      height: "100%",
      justifyContent: "center",
      flexDirection: "column"
    },
    resendWrapper: {
      marginTop: theme.spacing(5),
      justifyContent: "center"
    },
    resendButton: {
      fontSize: "12px",
      marginLeft: theme.spacing(1),
      // Todo: delete the 5 next lines and use theme with `color="secondary"`
      color: "#F1C40F",
      borderColor: "#F1C40F",
      "&:hover": {
        backgroundColor: "rgba(241,196,15,0.08)"
      }
    }
  })
);

export default useStyles;
