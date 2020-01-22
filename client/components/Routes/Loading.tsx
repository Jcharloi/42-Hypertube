import React, { ReactElement } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  center: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Loading = (): ReactElement => {
  const classes = useStyles({});
  return (
    <Grid container className={classes.center}>
      <CircularProgress />
    </Grid>
  );
};

export default Loading;
