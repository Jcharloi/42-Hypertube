import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { amber, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // Todo: maybe add these color to the Theme (and choose cool color in adequacy with the website's color)
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.main
    },
    warning: {
      backgroundColor: amber[700]
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    iconVariant: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    close: {
      padding: theme.spacing(0.5)
    },
    closeIcon: {
      fontSize: 20
    }
  })
);

export default useStyles;
