import React, { ReactElement } from "react";
import Grid from "@material-ui/core/Grid";

import CustomRoute from "../Routes/CustomRoute";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";

const Authentication = (): ReactElement => (
  <Grid container alignItems="center" justify="center">
    <CustomRoute exact path="/" component={SignIn} requireAuth={false} />
    <CustomRoute exact path="/sign-up" component={SignUp} requireAuth={false} />
    <CustomRoute
      exact
      path="/reset-password"
      component={ResetPassword}
      requireAuth={false}
    />
  </Grid>
);

export default Authentication;
