import React, { ReactElement, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

import useStyles from "./ConfirmEmail.style";

import verifiyEmail from "./ConfirmEmail.service";

const ConfirmEmail = (): ReactElement => {
  const [waiting, setWaiting] = useState(true);
  const [verified, setVerified] = useState(false);
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});

  useEffect(() => {
    verifiyEmail("123")
      .then(() => {
        setWaiting(false);
        setVerified(true);
      })
      .catch(() => {
        setWaiting(false);
      });
  }, []);
  return (
    <div>
      {waiting && (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.centerWrapper}
        >
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" gutterBottom>
              {_t({ id: "authentication.confirmEmail.waiting" })}
            </Typography>
          </Grid>
        </Grid>
      )}

      {!waiting && verified && (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.centerWrapper}
        >
          <Grid item>
            <Typography variant="body1" align="center" gutterBottom>
              {_t({ id: "authentication.confirmEmail.verified" })}
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/" className={classes.buttonLink}>
              <Button variant="contained" size="large" color="primary">
                {_t({ id: "authentication.confirmEmail.homeButton" })}
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}

      {!waiting && !verified && (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.centerWrapper}
        >
          <Grid item>
            <Typography variant="body1" align="center" gutterBottom>
              {_t({ id: "authentication.confirmEmail.notVerified" })}
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ConfirmEmail;
