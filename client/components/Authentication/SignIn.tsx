import React, { ReactElement, useState, ChangeEvent, FormEvent } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

import useStyle from "./SignIn.styles";
import { AuthInfo, checkErrors, sendAuth } from "./SignIn.service";
import { requiredErrorKey } from "./errorKey";

const errorsToRemoveOnChange = [requiredErrorKey];

const SignIn = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useStyle({});
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    username: "",
    password: ""
  });
  const [authError, setAuthError] = useState<AuthInfo>({
    username: "",
    password: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value
    });
    // If error is not relevant after a change, delete it
    if (errorsToRemoveOnChange.includes(authError[e.target.name])) {
      setAuthError({
        ...authError,
        [e.target.name]: ""
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newError = checkErrors(authInfo);
    setAuthError(newError);
    if (newError.username === "" && newError.password === "") {
      console.log("calling api !");
      sendAuth(authInfo)
        .then(() => {
          console.log("CONNECTED");
        })
        .catch(() => {
          console.log("ERROR");
        });
    }
  };

  return (
    <Grid container className={classes.center}>
      <Paper className={classes.signUpPage}>
        <Grid container alignItems="center" className={classes.height}>
          <Typography variant="subtitle1">
            {_t({ id: "authentication.SignIn.signUpMessage" })}
            <span role="img" aria-label="baby">
              👶🏻
            </span>
          </Typography>
          <Link to="/sign-up" className={classes.niceLink}>
            <Button
              // color="secondary"
              className={classes.signUpButton}
            >
              {_t({ id: "authentication.SignIn.signUpButton" })}
            </Button>
          </Link>
        </Grid>
      </Paper>

      <Paper className={classes.signInPage}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h5">
            {_t({ id: "authentication.SignIn.title" })}
            <span role="img" aria-label="pop-corn">
              🍿
            </span>
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container direction="column" alignItems="center">
              <Grid item className={classes.item}>
                <TextField
                  value={authInfo.username}
                  helperText={
                    authError.username !== ""
                      ? _t({ id: authError.username })
                      : ""
                  }
                  error={authError.username !== ""}
                  name="username"
                  id="username"
                  autoComplete="username"
                  onChange={handleInputChange}
                  label={_t({ id: "authentication.SignIn.username" })}
                  variant="filled"
                  className={classes.textInput}
                  inputProps={{ maxLength: 30 }}
                  autoFocus
                />
              </Grid>
              <Grid item className={classes.item}>
                <TextField
                  value={authInfo.password}
                  helperText={
                    authError.password !== ""
                      ? _t({ id: authError.password })
                      : ""
                  }
                  error={authError.password !== ""}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                  label={_t({ id: "authentication.SignIn.password" })}
                  variant="filled"
                  className={classes.textInput}
                  inputProps={{ maxLength: 1028 }}
                  type="password"
                />
              </Grid>
              <Grid item className={classes.forgotPasswordItem}>
                <Link to="/reset-password" className={classes.niceLink}>
                  <Button
                    // color="secondary"
                    className={classes.forgotPasswordButton}
                  >
                    {_t({ id: "authentication.SignIn.forgotPassword" })}
                  </Button>
                </Link>
              </Grid>
              <Grid item className={classes.item}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  className={classes.sendButton}
                >
                  {_t({ id: "authentication.SignIn.login" })}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
      {/* Invisible Item to center on Sign In Paper */}
      <Grid item className={classes.fakeItem} />
    </Grid>
  );
};

export default SignIn;
