import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titles: {
      margin: `${theme.spacing(3)}px 0px ${theme.spacing(5)}px`
    },
    subtitle: {
      marginTop: `${theme.spacing(1)}px`
    },
    emailRound: {
      width: "80px",
      height: "80px",
      backgroundColor: theme.palette.primary.main,
      margin: `${theme.spacing(3)}px`
    },
    emailIcon: {
      fontSize: "50px"
    },
    randomWrapper: {
      height: "100%"
    },
    resendWrapper: {
      marginTop: "40px"
    },
    resendButton: {
      fontSize: "12px",
      marginLeft: "10px"
    }
  })
);

export default useStyles;
