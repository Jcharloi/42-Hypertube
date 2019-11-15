import React, { ReactElement, ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useIntl } from 'react-intl';

import useStyles from './SignUp.styles';

const SignUp = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    picture: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => setUserInfo({
    ...userInfo,
    [e.target.name]: e.target.value,
  });

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


        <form>
          <Grid container direction="column" alignItems="center">

            {/* Text input */}
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.username}
                name="username"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.username' })}
                variant="filled"
                className={classes.textInput}
                autoFocus
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.email}
                name="email"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.email' })}
                variant="filled"
                className={classes.textInput}
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.firstName}
                name="firstName"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.firstName' })}
                variant="filled"
                className={classes.textInput}
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                value={userInfo.lastName}
                name="lastName"
                onChange={handleInputChange}
                label={_t({ id: 'authentication.signUp.lastName' })}
                variant="filled"
                className={classes.textInput}
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
                  />
                  <Button variant="outlined" color="secondary" startIcon={<CloudUploadIcon />} component="span">
                    {_t({ id: 'authentication.signUp.uploadButton' })}
                  </Button>
                </label>
              </Grid>
            </Grid>

            {/* Send form */}
            <Grid item className={classes.item}>
              <Button variant="contained" size="large" color="primary">{_t({ id: 'authentication.signUp.sendButton' })}</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};
export default SignUp;
