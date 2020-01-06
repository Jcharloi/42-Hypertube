import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  page: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    padding: "40px"
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
  },
  randomWrapper: {
    height: "100%"
  }
}));

export default useStyles;
