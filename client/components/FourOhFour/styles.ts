import { makeStyles } from "@material-ui/core/styles";

const useFourOhFourStyles = makeStyles(() => ({
  container: {
    userSelect: "none",
    fontFamily: "Poppins",
    height: "100%",
    padding: "1rem",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundWrapper: {
    position: "absolute",
    overflow: "hidden",
    transform: "rotate(-24deg)",
    fontFamily: "Eczar",
    fontSize: "10vh",
    color: "#282828",
    letterSpacing: "0.025em",
    margin: 0,
    transition: "750ms ease-in-out"
  },
  homeLink: {
    marginLeft: "1rem",
    marginTop: "1rem",
    border: "2px solid #555",
    padding: "0.5em 0.8em",
    position: "fixed",
    zIndex: 1,
    color: "#555",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "150ms",
    "svg > polyline": {
      transition: "150ms"
    },
    "&:hover": {
      color: "#333",
      background: "#dadada",
      borderColor: "transparent",
      "svg > polyline": {
        stroke: "#000"
      },
      "+ .background-wrapper > h1": {
        color: "#dadada"
      }
    }
  },
  notExists: {
    color: "#dadada",
    fontSize: "32px",
    position: "fixed",
    bottom: "1rem",
    right: "1.5rem",
    margin: 0,
    textAlign: "right",
    textShadow:
      "-1px -1px 0 #121212, 1px 1px 0 #121212, -1px 1px 0 #121212, 1px -1px 0 #121212"
  }
}));

export default useFourOhFourStyles;
