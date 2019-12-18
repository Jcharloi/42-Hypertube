import React, { ReactElement } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const Loading = (): ReactElement => (
  <Grid
    container
    alignItems="center"
    justify="center"
    style={{ minHeight: "100%" }}
  >
    <CircularProgress />
  </Grid>
);

export default Loading;
