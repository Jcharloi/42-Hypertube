import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  center: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    maxWidth: "500px",
    flexGrow: 1,
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    padding: `${theme.spacing(0.5)}px`
  },
  registerPage: {
    maxWidth: "650px",
    flexGrow: 1,
    alignSelf: "flex-start",
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    padding: `${theme.spacing(0.5)}px`
  },
  titles: {
    margin: `${theme.spacing(3)}px 0px ${theme.spacing(5)}px`,
    flexDirection: "column",
    alignItems: "center"
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
    height: "100%",
    FlexDirection: "column",
    justifyContent: "center"
  }
}));

export default useStyles;
