import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

import Typography from "@material-ui/core/Typography";

import useFourOhFourStyles from "./styles";

const FourOhFour = (): ReactElement => {
  const classes = useFourOhFourStyles({});
  const { formatMessage: _t } = useIntl();

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.fourOhFour}>
        {_t({ id: "fourOhFour.title" })}
      </Typography>
      <Typography variant="h6">{_t({ id: "fourOhFour.content" })}</Typography>
      <Link to="/" className={classes.linkMenu}>
        {_t({ id: "fourOhFour.link_menu" })}
      </Link>
    </div>
  );
};

export default FourOhFour;
