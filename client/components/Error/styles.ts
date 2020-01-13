import { makeStyles } from "@material-ui/core/styles";

const useFourOhFourStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins"
  },
  error: {
    fontFamily: "Poppins",
    padding: theme.spacing(5),
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  linkMenu: {
    color: theme.palette.text.primary,
    cursor: "pointer"
  }
}));

export default useFourOhFourStyles;
