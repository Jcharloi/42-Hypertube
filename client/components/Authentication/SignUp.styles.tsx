import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles((theme: Theme) => createStyles({
  page: {
    margin: `${theme.spacing(1)}px`,
    // Using indigo for now bevause we're using material default's theme
    // todo: change and use theme in the future
    backgroundColor: indigo[50],
  },
  titles: {
    margin: `${theme.spacing(3)}px 0px ${theme.spacing(5)}px`,
  },
  subtitle: {
    marginTop: `${theme.spacing(1)}px`,
  },
}));

export default useStyles;
