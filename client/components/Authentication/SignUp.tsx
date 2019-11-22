import React, { ReactElement, ChangeEvent, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import { useIntl } from 'react-intl';
import useStyles from './SignUp.styles';

import SigneUpForm from './SignUpForm';

import {
  UserInfo, UserError, requiredErrorKey, requiredPictureErrorKey, checkRequiredField,
  validateEmail, validatePassword, validatePicture, isThereError, sendSignUpData,
} from './SignUp.service';


const errosToRemoveOnChange = [
  requiredErrorKey,
  requiredPictureErrorKey,
  'authentication.signUp.error.username.taken',
  'authentication.signUp.error.email.taken',
];

const SignUp = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});
  const [waitingRes, setWaitingRes] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    picture: null,
  });
  const [userError, setUserError] = useState<UserError>({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    picture: '',
  });

  /**
   * Change State when user is typing in the form
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type === 'file' && e.target.files[0]) {
      const picErr = validatePicture(e.target.files[0]);
      setUserError({
        ...userError,
        picture: picErr,
      });
      if (picErr === '') {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        setUserInfo({
          ...userInfo,
          picture: data,
        });
      }
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    }
    // If error is 'required' type, delete it
    if (errosToRemoveOnChange.includes(userError[e.target.name])) {
      setUserError({
        ...userError,
        [e.target.name]: '',
      });
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
    // todo: keep error like mail/usrname taken ?
    const newUserError = checkRequiredField(userInfo);
    newUserError.email = userInfo.email === '' || validateEmail(userInfo.email) ? newUserError.email : 'authentication.signUp.error.email.invalid';
    newUserError.password = userInfo.password === '' || validatePassword(userInfo.password) ? newUserError.password : 'authentication.signUp.error.password.invalid';

    setUserError(newUserError);
    if (!isThereError(newUserError)) {
      setWaitingRes(true);
      sendSignUpData(userInfo).then((data) => {
        setWaitingRes(false);
        console.log('DONE', data);
      }).catch(({ response: { data } }) => {
        setWaitingRes(false);
        setUserError({
          ...newUserError,
          username: data.nameTaken ? 'authentication.signUp.error.username.taken' : '',
          email: data.emailTaken ? 'authentication.signUp.error.email.taken' : '',
        });
      });
    }
  };

  return (
    <Paper className={classes.page}>
      <Grid container direction="column" alignItems="center">
        <Grid container direction="column" alignItems="center" className={classes.titles}>
          <Grid item>
            <Typography variant="h3">
              {_t({ id: 'authentication.signUp.title' })}
              <span role="img" aria-label="Eyes"> 👀</span>
            </Typography>
          </Grid>
          <Grid item className={classes.subtitle}>
            <Typography variant="subtitle1">
              {_t({ id: 'authentication.signUp.subtitle' })}
              <span role="img" aria-label="Eyes"> 🤭</span>
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

      </Grid>
    </Paper>
  );
};
export default SignUp;
