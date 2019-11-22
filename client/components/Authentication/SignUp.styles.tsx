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
  item: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  textInput: {
    width: '300px',
  },
  pictureErrorMsg: {
    // same as material-ui Textfiel helperText
    color: '#f44336',
    marginTop: '8px',
    fontSize: '12px',
  },
  circularProgressContainer: {
    position: 'relative',
  },
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-20px',
    marginLeft: '-20px',
  },
}));

export default useStyles;
