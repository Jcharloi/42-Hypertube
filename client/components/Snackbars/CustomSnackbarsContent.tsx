import React, { ReactElement, SyntheticEvent, MouseEvent } from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./CustomSnackbarsContent.styles";
import { CustomSnackbarVariant } from "../../models/models";

interface Props {
  message: string;
  variant?: CustomSnackbarVariant;
  handleClose: (_event: SyntheticEvent | MouseEvent, reason?: string) => void;
}

const CustomSnackbarContent = ({
  message,
  variant,
  handleClose
}: Props): ReactElement => {
  const classes = useStyles({});

  const getIcon = (): ReactElement => {
    switch (variant) {
      case "success":
        return <CheckCircleIcon className={classes.iconVariant} />;
      case "warning":
        return <WarningIcon className={classes.iconVariant} />;
      case "error":
        return <ErrorIcon className={classes.iconVariant} />;
      case "info":
        return <InfoIcon className={classes.iconVariant} />;
      default:
        return <span />;
    }
  };

  const getClasses = (): string => {
    switch (variant) {
      case "success":
        return classes.success;
      case "warning":
        return classes.warning;
      case "error":
        return classes.error;
      case "info":
        return classes.info;
      default:
        return "";
    }
  };

  return (
    <SnackbarContent
      className={getClasses()}
      aria-describedby="message"
      message={
        <span id="message" className={classes.message}>
          {getIcon()}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
          className={classes.close}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      ]}
    />
  );
};

export default CustomSnackbarContent;
