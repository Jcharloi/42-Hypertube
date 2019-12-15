import React, { ReactElement } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";

import { useIntl } from "react-intl";
import useStyles from "./SignUpDone.styles";

import resendConfrimationEmail, { User } from "./SignUpDone.service";

interface Props {
  user: User;
}

const SignUpDone = ({ user }: Props): ReactElement => {
  const { locale, formatMessage: _t } = useIntl();
  const classes = useStyles({});

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.titles}
    >
      {/* Title */}
      <Grid item>
        <Typography variant="h4" align="center">
          {`${_t({ id: "authentication.signUp.validForm.title" })} ${
            user.firstName
          }`}
          <span role="img" aria-label="Waving hand">
            {" "}
            👋🏻
          </span>
        </Typography>
      </Grid>
      {/* Icon + instruction */}
      <Grid container direction="row" justify="center">
        {/* Mail icon */}
        <Grid item>
          <Avatar className={classes.emailRound}>
            <EmailIcon color="secondary" className={classes.emailIcon} />
          </Avatar>
        </Grid>
        {/* instruction */}
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
      {/* Resend */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.resendWrapper}
      >
        <Grid item>
          <Typography variant="body2" align="center">
            {_t({ id: "authentication.signUp.validForm.emailProblem" })}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.resendButton}
            onClick={(): void => resendConfrimationEmail(user.id, locale)}
          >
            {_t({
              id: "authentication.signUp.validForm.emailProblemButton"
            })}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpDone;
