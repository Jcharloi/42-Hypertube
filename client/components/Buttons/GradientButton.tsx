import React, { ReactElement } from "react";

import LoadingButton, { Props as LoadingButtonProps } from "./LoadingButton";
import useStyles from "./GradientButton.style";

const GradientButton = ({
  text,
  loadingText,
  loading,
  type,
  variant,
  size,
  color,
  circularProgressColor,
  buttonClass,
  circularProgressClass
}: LoadingButtonProps): ReactElement => {
  const classes = useStyles({});
  return (
    <LoadingButton
      text={text}
      loadingText={loadingText}
      loading={loading}
      type={type}
      variant={variant}
      size={size}
      color={color}
      circularProgressColor={circularProgressColor}
      buttonClass={`${buttonClass || ""} ${classes.customButton}`}
      circularProgressClass={circularProgressClass}
    />
  );
};

export default GradientButton;
