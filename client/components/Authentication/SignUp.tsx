import React, { ReactElement, ChangeEvent, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EmailIcon from "@material-ui/icons/Email";

import { useIntl } from "react-intl";
import useStyles from "./SignUp.styles";

import SigneUpForm from "./SignUpForm";

import {
  UserInfo,
  UserError,
  requiredErrorKey,
  usernameTakenErororKey,
  emailTakenErororKey,
  checkErrors,
  getPictureError,
  isThereError,
  sendSignUpData
} from "./SignUp.service";

const errosToRemoveOnChange = [
  requiredErrorKey,
  usernameTakenErororKey,
  emailTakenErororKey
];

const SignUp = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});
  const [waitingRes, setWaitingRes] = useState(false);
  const [validForm, setvValidForm] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    picture: null
  });
  const [userError, setUserError] = useState<UserError>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    picture: ""
  });

  /**
   * Change State when user is typing in the form
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type === "file" && e.target.files[0]) {
      const picErr = getPictureError(e.target.files[0]);
      setUserError({
        ...userError,
        picture: picErr
      });
      if (picErr === "") {
        setUserInfo({
          ...userInfo,
          picture: e.target.files[0]
        });
      }
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
      });
      // If error is 'required' type, delete it
      if (errosToRemoveOnChange.includes(userError[e.target.name])) {
        setUserError({
          ...userError,
          [e.target.name]: ""
        });
      }
    }
  };

  /**
   * Submit the form if:
   * - all the filled are complete
   * - mail is valid
   * - password is valid
   * - picture is valid
   * else set error(s) message(s)
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newUserError = checkErrors(userInfo, userError);

    setUserError(newUserError);
    if (!isThereError(newUserError)) {
      setWaitingRes(true);

      sendSignUpData(userInfo)
        .then((data) => {
          setWaitingRes(false);
          console.log("DONE", data);
          setvValidForm(true);
        })
        .catch(({ response: { data } }) => {
          setWaitingRes(false);
          setUserError({
            ...newUserError,
            username: data.nameTaken ? usernameTakenErororKey : "",
            email: data.emailTaken ? emailTakenErororKey : ""
          });
        });
    }
  };

  return (
    <Paper className={classes.page}>
      <Grid container direction="column" alignItems="center">
        {!validForm && (
          <div>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.titles}
            >
              <Grid item>
                <Typography variant="h3" align="center">
                  {_t({ id: "authentication.signUp.title" })}
                  <span role="img" aria-label="Eyes">
                    {" "}
                    👀
                  </span>
                </Typography>
              </Grid>
              <Grid item className={classes.subtitle}>
                <Typography variant="subtitle1" align="center">
                  {_t({ id: "authentication.signUp.subtitle" })}
                  <span role="img" aria-label="Eyes">
                    {" "}
                    🤭
                  </span>
                </Typography>
              </Grid>
            </Grid>

            <SigneUpForm
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              userInfo={userInfo}
              userError={userError}
              waitingRes={waitingRes}
            />
          </div>
        )}

        {validForm && (
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.titles}
          >
            <Grid item>
              <Typography variant="h4" align="center">
                {`${_t({ id: "authentication.signUp.validForm.title" })} ${
                  userInfo.firstName
                }`}
                <span role="img" aria-label="Waving hand">
                  {" "}
                  👋🏻
                </span>
              </Typography>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item>
                <Avatar className={classes.emailRound}>
                  <EmailIcon color="secondary" className={classes.emailIcon} />
                </Avatar>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  className={classes.randomWrapper}
                >
                  <Grid item className={classes.subtitle}>
                    <Typography variant="subtitle1" align="center">
                      {_t({ id: "authentication.signUp.validForm.checkEmail" })}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.subtitle}>
                    <Typography variant="subtitle1" align="center">
                      {_t({
                        id: "authentication.signUp.validForm.bingeWatching"
                      })}
                      <span role="img" aria-label="Shush guy">
                        {" "}
                        🤫
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
export default SignUp;
