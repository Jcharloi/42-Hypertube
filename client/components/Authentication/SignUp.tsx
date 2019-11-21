import React, { ReactElement, ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { useIntl } from 'react-intl';

import {
  UserInfo, UserError, requiredErrorKey, requiredPictureErrorKey, checkRequiredField,
  validateEmail, validatePassword, validatePicture, isThereError, sendSignUpData,
} from './SignUp.service';

import useStyles from './SignUp.styles';

const SignUp = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});
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
    if (e.target.type === 'file') {
      if (validatePicture(e.target.files[0])) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        setUserInfo({
          ...userInfo,
          picture: data,
        });
      } else {
        setUserError({
          ...userError,
          picture: 'authentication.signUp.error.file',
        });
      }
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    }

    // If error is 'required' type, delete it
    if (userError[e.target.name] === requiredErrorKey
    || userError[e.target.name] === requiredPictureErrorKey) {
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
   * else set error message
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newUserError = checkRequiredField(userInfo);
    newUserError.email = userInfo.email === '' || validateEmail(userInfo.email) ? newUserError.email : 'authentication.signUp.error.email';
    newUserError.password = userInfo.password === '' || validatePassword(userInfo.password) ? newUserError.password : 'authentication.signUp.error.password';

    setUserError(newUserError);
    if (!isThereError(newUserError)) {
      console.log('SENDING ! 😱');

      sendSignUpData(userInfo).then((data) => {
        console.log('DONE', data);
      }).catch((err) => {
        console.log('Error', err);
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


        <form onSubmit={handleSubmit}>
          <Grid container direction="column" alignItems="center">

            {/* Text input */}
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.username}
                helperText={userError.username !== '' ? _t({ id: userError.username }) : ''}
                error={userError.username !== ''}
                name="username"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.username' })}
                variant="filled"
                className={classes.textInput}
                inputProps={{ maxLength: 30 }}
                autoFocus
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.password}
                helperText={userError.password !== '' ? _t({ id: userError.password }) : ''}
                error={userError.password !== ''}
                name="password"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.password' })}
                variant="filled"
                className={classes.textInput}
                inputProps={{ maxLength: 1028 }}
                type="password"
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.email}
                helperText={userError.email !== '' ? _t({ id: userError.email }) : ''}
                error={userError.email !== ''}
                name="email"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.email' })}
                variant="filled"
                className={classes.textInput}
                inputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.firstName}
                helperText={userError.firstName !== '' ? _t({ id: userError.firstName }) : ''}
                error={userError.firstName !== ''}
                name="firstName"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.firstName' })}
                variant="filled"
                className={classes.textInput}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.lastName}
                helperText={userError.lastName !== '' ? _t({ id: userError.lastName }) : ''}
                error={userError.lastName !== ''}
                name="lastName"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.lastName' })}
                variant="filled"
                className={classes.textInput}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>

            {/* Picture upload */}
            <Grid container direction="column" alignItems="center" className={classes.item}>
              <Grid item>
                <Typography variant="body1" gutterBottom>
                  {_t({ id: 'authentication.signUp.picture' })}
                  <span role="img" aria-label="Arm taking a selfie"> 🤳</span>
                </Typography>
              </Grid>
              <Grid item>
                <label htmlFor="raised-button-file">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    name="picture"
                    onChange={handleInputChange}
                  />
                  <Button variant="outlined" color="secondary" startIcon={<CloudUploadIcon />} component="span">
                    {_t({ id: 'authentication.signUp.uploadButton' })}
                  </Button>
                </label>
              </Grid>
              {userError.picture !== ''
                && (
                  <Grid item>
                    <Typography variant="body2" className={classes.pictureErrorMsg}>
                      {_t({ id: userError.picture })}
                    </Typography>
                  </Grid>
                )}
            </Grid>

            {/* Send form */}
            <Grid item className={classes.item}>
              <Button type="submit" variant="contained" size="large" color="primary">{_t({ id: 'authentication.signUp.sendButton' })}</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};
export default SignUp;
