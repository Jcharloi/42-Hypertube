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
    margin: theme.spacing(3, 1),
    padding: theme.spacing(0.5)
  },
  registerPage: {
    maxWidth: "650px",
    flexGrow: 1,
    alignSelf: "flex-start",
    margin: theme.spacing(3, 1),
    padding: theme.spacing(0.5)
  },
  titles: {
    margin: theme.spacing(3, 0, 5),
    flexDirection: "column",
    alignItems: "center"
  },
  subtitle: {
    marginTop: theme.spacing(1)
  },
  signInLink: {
    textDecoration: "none",
    marginBottom: theme.spacing(3)
  },
  signInButton: {
    textTransform: "none",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.08)"
    }
  },
  emailRound: {
    width: "80px",
    height: "80px",
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(3)
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
