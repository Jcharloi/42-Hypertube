import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    languageToggleButton: {
      height: "100%",
      fontSize: "25px"
    },
    languageMenu: {
      fontSize: "25px"
    }
  })
);

export default useStyles;
