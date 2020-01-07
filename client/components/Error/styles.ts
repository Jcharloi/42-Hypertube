import { makeStyles } from "@material-ui/core/styles";

const useErrorStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    userSelect: "none"
  },
  errorWrapper: {
    padding: 16,
    display: "flex",
    position: "relative",
    backgroundColor: "#fff"
  }
}));

export default useErrorStyles;
