import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    centerWrapper: {
      height: "100%"
    },
    buttonLink: {
      textDecoration: "none"
    }
  })
);

export default useStyles;
