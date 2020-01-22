import React, { ReactElement } from "react";
import Grid from "@material-ui/core/Grid";

import CustomRoute from "../Routes/CustomRoute";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";

const Authentication = (): ReactElement => (
  <Grid
    container
    alignItems="center"
    justify="center"
    direction="column"
    style={{ flexGrow: 1, padding: "8px" }}
  >
    <CustomRoute exact path="/" notAuthComponent={SignIn} />
    <CustomRoute exact path="/sign-up" notAuthComponent={SignUp} />
    <CustomRoute
      exact
      path="/reset-password"
      notAuthComponent={ResetPassword}
    />
  </Grid>
);

export default Authentication;
