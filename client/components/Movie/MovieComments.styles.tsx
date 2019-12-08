import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    containerRatingAndComment: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "70%"
    },
    movieRating: {
      display: "flex",
      justifyContent: "center",
      fontSize: "1.3rem",
      marginBottom: "0.5rem"
    },
    commentTitle: {
      fontSize: "1rem",
      marginBottom: "1rem"
    },
    containerComment: {
      backgroundColor: "#151515",
      borderRadius: "4px",
      height: "auto",
      maxHeight: "50vh"
    },
    containerPeople: {
      marginTop: "1rem",
      maxHeight: "35vh",
      borderBottom: "1px solid #888888",
      overflow: "scroll",
      overflowX: "hidden"
    },
    comment: {
      margin: "1rem 0"
    }
  })
);

export default useStyles;
