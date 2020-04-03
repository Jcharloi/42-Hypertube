import { makeStyles } from "@material-ui/core/styles";

export const useHomeStyles = makeStyles(() => ({
  mainPoster: {
    background:
      "linear-gradient(to bottom, transparent 40%, black 80%), url('https://fr.web.img6.acsta.net/pictures/19/11/19/12/39/2279585.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "50% 0%",
    width: "100%",
    height: "100%",
    marginTop: "0",
    display: "flex"
  },
  boxContent: {
    marginTop: "23%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap"
  },
  miniaturePoster: {
    height: "400px",
    width: "280px",
    bottom: "0",
    marginBottom: "120px",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    cursor: "pointer",
    flexWrap: "wrap",
    textDecoration: "none",
    color: "white"
  },
  miniatureImage: {
    width: "100%",
    height: "100%"
  },
  movieTitle: {
    width: "100%",
    margin: "0",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans- serif"
  },
  genre: {
    margin: "0"
  }
}));

export const useRecentMoviesStyle = makeStyles(() => ({}));
