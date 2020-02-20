import React, { ReactElement, SyntheticEvent, MouseEvent } from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";

import CustomSnackbarContent from "./CustomSnackbarsContent";
import { CustomSnackbarVariant } from "../../models/models";

interface Props {
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  variant?: CustomSnackbarVariant;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
}

const defaultAnchor: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "left"
};

/**
 * Display a message (a string) in a pre-formated Snackbar
 *
 * The message is diplayed with a background color,
 * an icon and a close button, according to the
 * choosen "variant" (using CustomSnackbarContent)
 * You can also optionaly change the `autoHideDuration` and the `anchorOrigin`
 *
 * Snackbar close event is handle by this component using the `setOpen`
 * function to set the `open` to false
 */
const CustomSnackbars = ({
  message,
  open,
  setOpen,
  autoHideDuration,
  variant,
  anchorOrigin
}: Props): ReactElement => {
  const handleClose = (
    _event: SyntheticEvent | MouseEvent,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={anchorOrigin || defaultAnchor}
      autoHideDuration={autoHideDuration || 3500}
    >
      <CustomSnackbarContent
        message={message}
        variant={variant}
        handleClose={handleClose}
      />
    </Snackbar>
  );
};

export default CustomSnackbars;
