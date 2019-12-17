import React, { ReactElement, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";

import { useIntl } from "react-intl";
import useStyles from "./SignUpDone.styles";

import resendConfrimationEmail, { User } from "./SignUpDone.service";

import CustomSnackbars from "../Snackbars/CustomSnackbars";
import { Variant } from "../Snackbars/CustomSnackbarsContent";

interface Props {
  user: User;
}

const SignUpDone = ({ user }: Props): ReactElement => {
  const { locale, formatMessage: _t } = useIntl();
  const classes = useStyles({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<Variant>("success");

  const handleResendClick = (): void => {
    resendConfrimationEmail(user.id, locale)
      .then(() => {
        setMessage(_t({ id: "authentication.signUpDone.snack.send" }));
        setVariant("success");
        setOpen(true);
      })
      .catch(
        ({
          response: {
            data: { error }
          }
        }) => {
          if (error === "TOO_SOON") {
            setMessage(_t({ id: "authentication.signUpDone.snack.tooSoon" }));
            setVariant("warning");
          } else if (error === "WRONG_USER") {
            setMessage(
              _t({ id: "authentication.signUpDone.snack.alreadyConfirmed" })
            );
            setVariant("info");
          } else {
            setMessage(_t({ id: "authentication.signUpDone.snack.unknown" }));
            setVariant("error");
          }
          setOpen(true);
        }
      );
  };

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
          {`${_t({ id: "authentication.signUpDone.title" })} ${user.firstName}`}
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
                {_t({ id: "authentication.signUpDone.weSent" })}
                <b>{user.email}</b>
              </Typography>
            </Grid>
            <Grid item className={classes.subtitle}>
              <Typography variant="subtitle1" align="center">
                {_t({ id: "authentication.signUpDone.goClick" })}
              </Typography>
            </Grid>
            <Grid item className={classes.subtitle}>
              <Typography variant="subtitle1" align="center">
                {_t({
                  id: "authentication.signUpDone.bingeWatching"
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
            {_t({ id: "authentication.signUpDone.emailProblem" })}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.resendButton}
            onClick={handleResendClick}
          >
            {_t({
              id: "authentication.signUpDone.emailProblemButton"
            })}
          </Button>
          <CustomSnackbars
            message={message}
            open={open}
            setOpen={setOpen}
            variant={variant}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpDone;
