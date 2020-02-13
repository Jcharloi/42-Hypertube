import React, { ReactElement, ChangeEvent, FormEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";

import useStyles from "./SignUpForm.styles";

import { UserInfo, UserError } from "./SignUp.service";

interface Props {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  userInfo: UserInfo;
  userError: UserError;
  waitingRes: boolean;
}

const SignUpForm = ({
  handleInputChange,
  handleSubmit,
  userInfo,
  userError,
  waitingRes
}: Props): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container direction="column" alignItems="center">
        {/* Text input */}
        <Grid item className={classes.item}>
          <TextField
            value={userInfo.username}
            helperText={
              userError.username !== "" ? _t({ id: userError.username }) : ""
            }
            error={userError.username !== ""}
            name="username"
            id="username"
            autoComplete="section-newuser username"
            onChange={handleInputChange}
            label={_t({ id: "authentication.signUp.username" })}
            variant="filled"
            className={classes.textInput}
            inputProps={{ maxLength: 30 }}
            autoFocus
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            value={userInfo.password}
            helperText={
              userError.password !== "" ? _t({ id: userError.password }) : ""
            }
            error={userError.password !== ""}
            name="password"
            id="password"
            autoComplete="section-newuser new-password"
            onChange={handleInputChange}
            label={_t({ id: "authentication.signUp.password" })}
            variant="filled"
            className={classes.textInput}
            inputProps={{ maxLength: 1028 }}
            type="password"
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            value={userInfo.email}
            helperText={
              userError.email !== "" ? _t({ id: userError.email }) : ""
            }
            error={userError.email !== ""}
            name="email"
            id="email"
            autoComplete="section-newuser home email"
            onChange={handleInputChange}
            label={_t({ id: "authentication.signUp.email" })}
            variant="filled"
            className={classes.textInput}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            value={userInfo.firstName}
            helperText={
              userError.firstName !== "" ? _t({ id: userError.firstName }) : ""
            }
            error={userError.firstName !== ""}
            name="firstName"
            id="firstName"
            autoComplete="section-newuser given-name"
            onChange={handleInputChange}
            label={_t({ id: "authentication.signUp.firstName" })}
            variant="filled"
            className={classes.textInput}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            value={userInfo.lastName}
            helperText={
              userError.lastName !== "" ? _t({ id: userError.lastName }) : ""
            }
            error={userError.lastName !== ""}
            name="lastName"
            id="lastName"
            autoComplete="section-newuser family-name"
            onChange={handleInputChange}
            label={_t({ id: "authentication.signUp.lastName" })}
            variant="filled"
            className={classes.textInput}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>

        {/* Picture upload */}
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.item}
        >
          <Grid item>
            <Typography variant="body1" gutterBottom>
              {_t({ id: "authentication.signUp.picture" })}
              <span role="img" aria-label="Arm taking a selfie">
                {" "}
                🤳
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <label htmlFor="raised-button-file">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                name="picture"
                onChange={handleInputChange}
              />
              <Button
                variant="outlined"
                // color="secondary"
                className={classes.pictureButton}
                startIcon={<CloudUploadIcon />}
                component="span"
                // To avoid picture name to be in uppercase :
                style={userInfo.picture ? { textTransform: "none" } : {}}
              >
                {userInfo.picture
                  ? userInfo.picture.name
                  : _t({ id: "authentication.signUp.uploadButton" })}
              </Button>
            </label>
          </Grid>
          {userError.picture !== "" && (
            <Grid item>
              <Typography
                variant="body2"
                className={classes.pictureErrorMsg}
                align="center"
              >
                {_t({ id: userError.picture })}
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Send form */}
        <Grid item className={classes.item}>
          <div className={classes.circularProgressContainer}>
            <Button
              type="submit"
              disabled={waitingRes}
              variant="contained"
              size="large"
              color="primary"
              className={classes.sendButton}
            >
              {!waitingRes && _t({ id: "authentication.signUp.sendButton" })}
              {waitingRes &&
                _t({ id: "authentication.signUp.sendButton.waiting" })}
            </Button>
            {waitingRes && (
              <CircularProgress
                color="secondary"
                className={classes.circularProgress}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
