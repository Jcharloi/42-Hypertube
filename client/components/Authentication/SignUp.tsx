import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import useStyles from './SignUp.styles';

const SignUp = (): ReactElement => {
  const classes = useStyles({});

  return (
    <Paper className={classes.page}>
      <Grid container direction="column" alignItems="center">
        <Grid container direction="column" alignItems="center" className={classes.titles}>
          <Grid item>
            <Typography variant="h3">
              Qui es-tu ?
              <span role="img" aria-label="Eyes"> 👀</span>
            </Typography>
          </Grid>
          <Grid item className={classes.subtitle}>
            <Typography variant="subtitle1">
              Pour pouvoir acceder a tous nos films il va falloir s&apos;inscrire
              <span role="img" aria-label="Eyes"> 🤭</span>
            </Typography>
          </Grid>
        </Grid>


        <form>
          <Grid container direction="column" alignItems="center">

            {/* Text input */}
            <Grid item className={classes.item}>
              <TextField label="Ton petit pseudo" variant="filled" className={classes.textInput} autoFocus />
            </Grid>
            <Grid item className={classes.item}>
              <TextField label="Ton mail (pour qu'on te spam)" variant="filled" className={classes.textInput} />
            </Grid>
            <Grid item className={classes.item}>
              <TextField label="Ton prénom" variant="filled" className={classes.textInput} />
            </Grid>
            <Grid item className={classes.item}>
              <TextField label="Ton nom" variant="filled" className={classes.textInput} />
            </Grid>

            {/* Picture upload */}
            <Grid container direction="column" alignItems="center" className={classes.item}>
              <Grid item>
                <Typography variant="body1" gutterBottom>
                  Et ta belle tête de bg
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
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>

            {/* Send form */}
            <Grid item className={classes.item}>
              <Button variant="contained" size="large" color="primary">Je m&apos;inscrit sur ce site cool</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};
export default SignUp;
