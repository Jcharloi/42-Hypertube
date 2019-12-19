import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      maxWidth: "500px",
      flexGrow: 1,
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
      padding: `${theme.spacing(0.5)}px`,
      // Using indigo for now bevause we're using material default's theme
      // todo: change and use theme in the future
      backgroundColor: indigo[50]
    },
    registerPage: {
      maxWidth: "650px",
      flexGrow: 1,
      alignSelf: "flex-start",
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
      padding: `${theme.spacing(0.5)}px`,
      // Using indigo for now bevause we're using material default's theme
      // todo: change and use theme in the future
      backgroundColor: indigo[50]
    },
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
    }
  })
);

export default useStyles;
