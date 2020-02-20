import React, { ReactElement, ChangeEvent, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useIntl } from "react-intl";
import useStyles from "./SignUp.styles";

import SignUpForm from "./SignUpForm";
import SignUpDone from "./SignUpDone";

import {
  UserInfo,
  UserError,
  checkErrors,
  getPictureError,
  isThereError,
  sendSignUpData
} from "./SignUp.service";
import {
  requiredErrorKey,
  usernameTakenErrorKey,
  emailTakenErrorKey
} from "./errorKey";

const errorsToRemoveOnChange = [
  requiredErrorKey,
  usernameTakenErrorKey,
  emailTakenErrorKey
];

const SignUp = (): ReactElement => {
  const { locale, formatMessage: _t } = useIntl();
  const classes = useStyles({});
  const [waitingRes, setWaitingRes] = useState(false);
  const [userId, setUserId] = useState("");
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
    if (e.target.type === "file") {
      const picErr = e.target.files[0]
        ? getPictureError(e.target.files[0])
        : "";
      // Setting picture error
      setUserError({
        ...userError,
        picture: picErr
      });
      // Setting picture value
      setUserInfo({
        ...userInfo,
        picture: e.target.files[0] && picErr === "" ? e.target.files[0] : null
      });
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
      });
      // If error is not relevant after a change, delete it
      if (errorsToRemoveOnChange.includes(userError[e.target.name])) {
        setUserError({
          ...userError,
          [e.target.name]: ""
        });
      }
    }
  };

  /**
   * Submit the form if:
   * - all the field are complete
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

      sendSignUpData(userInfo, locale)
        .then(({ data: { id } }) => {
          setWaitingRes(false);
          setUserId(id);
        })
        .catch(({ response: { data } }) => {
          setWaitingRes(false);
          setUserError({
            ...newUserError,
            username: data.nameTaken ? usernameTakenErrorKey : "",
            email: data.emailTaken ? emailTakenErrorKey : ""
          });
        });
    }
  };

  return (
    <Grid container className={classes.center}>
      {userId === "" ? (
        <Paper className={classes.paper}>
          <Grid container direction="column" alignItems="center">
            <Grid container className={classes.titles}>
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

            <SignUpForm
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              userInfo={userInfo}
              userError={userError}
              waitingRes={waitingRes}
            />
          </Grid>
        </Paper>
      ) : (
        <SignUpDone user={{ ...userInfo, id: userId }} />
      )}
    </Grid>
  );
};
export default SignUp;
