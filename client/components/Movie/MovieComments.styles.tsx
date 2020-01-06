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
      maxHeight: "70vh",
      padding: "2rem"
    },
    containerPeople: {
      marginTop: "1rem",
      maxHeight: "35vh",
      borderBottom: "1px solid #888888",
      overflow: "scroll",
      overflowX: "hidden"
    },
    commentText: {
      marginRight: "0.5rem",
      whiteSpace: "pre-line",
      overflowWrap: "break-word"
    },
    comment: {
      margin: "1rem 0"
    },
    personalCommentContainer: {
      padding: "1rem 0",
      marginTop: "1rem"
    },
    textField: {
      width: "100%",
      backgroundColor: "white",
      maxHeight: "10rem",
      overflow: "scroll",
      overflowX: "hidden"
    },
    rateAndSendButton: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
      flexWrap: "wrap"
    },
    rateIt: { display: "flex", alignItems: "center", flexWrap: "wrap" },
    askRating: { marginRight: "0.2rem" },
    rateRequired: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "1rem",
      color: "red"
    }
  })
);

export default useStyles;
