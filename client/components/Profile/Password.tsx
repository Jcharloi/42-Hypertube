import React, {
  ReactElement,
  ChangeEvent,
  useState,
  useRef,
  useEffect
} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import SaveAlt from "@material-ui/icons/SaveAlt";
import { useIntl } from "react-intl";
import useProfileStyles from "./Profile.styles";
import useStyles from "./Password.styles";

const Password = (): ReactElement => {
  const { formatMessage: _t } = useIntl();
  const profileClasses = useProfileStyles({});
  const classes = useStyles({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  const errorToDeleteOnChange = ["profile.myprofile.password.error.different"];

  const validatePassword = (): void => {
    // if (newPassword !== confirmedPassword) {
    //   setConfirmedPasswordError("profile.myprofile.password.error.different");
    // }
    // setConfirmedPasswordError(
    //   confirmedPassword
    //     ? newPassword !== confirmedPassword
    //       ? "profile.myprofile.password.error.different"
    //       : ""
    //     : "profile.myprofile.password.error.required"
    // );
    if (confirmedPassword && newPassword) {
      setConfirmedPasswordError(
        newPassword !== confirmedPassword
          ? "profile.myprofile.password.error.different"
          : ""
      );
    } else {
      setConfirmedPasswordError(
        confirmedPassword ? "" : "profile.myprofile.password.error.required"
      );
      setNewPasswordError(
        newPassword ? "" : "profile.myprofile.password.error.required"
      );
    }
  };

  //   const handleErrorOnChange = (
  //     errorValue: string,
  //     setError: (error: string) => void
  //   ): void => {
  //     if (errorValue === "profile.myprofile.password.error.different") {
  //       setError("");
  //     }
  //   };

  return (
    <div className={profileClasses.containerInfo}>
      <TextField
        className={classes.input}
        onChange={(e): void => setOldPassword(e.target.value)}
        placeholder={_t({
          id: "profile.myprofile.password.placeholder.currentpass"
        })}
        type="password"
      />
      <TextField
        className={classes.input}
        onChange={(e): void => setNewPassword(e.target.value)}
        placeholder={_t({
          id: "profile.myprofile.password.placeholder.newpass"
        })}
        error={!!newPasswordError}
        helperText={newPasswordError ? _t({ id: newPasswordError }) : undefined}
        type="password"
      />
      <TextField
        className={classes.input}
        onChange={(e): void => setConfirmedPassword(e.target.value)}
        placeholder={_t({
          id: "profile.myprofile.password.placeholder.confirmedpass"
        })}
        error={!!confirmedPasswordError}
        helperText={
          confirmedPasswordError
            ? _t({ id: confirmedPasswordError })
            : undefined
        }
        type="password"
      />
      <Button onClick={validatePassword}>Ok</Button>
    </div>
  );
};

export default Password;
