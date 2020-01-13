import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

import Typography from "@material-ui/core/Typography";

import useErrorStyles from "./styles";

const Error = (): ReactElement => {
  const classes = useErrorStyles({});
  const { formatMessage: _t } = useIntl();

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.error}>
        {_t({ id: "error.title" })}
      </Typography>
      <Typography variant="h6">{_t({ id: "error.content" })}</Typography>
      <Link to="/" className={classes.linkMenu}>
        {_t({ id: "error.link_menu" })}
      </Link>
    </div>
  );
};
export default Error;
