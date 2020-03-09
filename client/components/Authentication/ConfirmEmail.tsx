import React, { ReactElement } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, RouteComponentProps } from "react-router-dom";
import { useIntl } from "react-intl";

import useStyles from "./ConfirmEmail.style";
import useApi from "../../hooks/useApi";

interface UrlParam {
  id: string;
}

const ConfirmEmail = ({
  match: {
    params: { id: emailId }
  }
}: RouteComponentProps<UrlParam>): ReactElement => {
  const { res, error } = useApi<{}, {}>(`/tokens/${emailId}/verify-email`, {
    method: "put",
    hotReload: true
  });
  const { formatMessage: _t } = useIntl();
  const classes = useStyles({});

  return (
    <Grid container className={classes.centerWrapper}>
      {!res && !error && (
        <>
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" gutterBottom>
              {_t({ id: "authentication.confirmEmail.waiting" })}
            </Typography>
          </Grid>
        </>
      )}

      {res && (
        <>
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
        </>
      )}

      {error && (
        <Grid item>
          <Typography variant="body1" align="center" gutterBottom>
            {_t({ id: "authentication.confirmEmail.notVerified" })}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ConfirmEmail;
