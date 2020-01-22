import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, cyan } from "@material-ui/core/colors";

export const useLayoutStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  contentContainer: {
    position: "relative",
    width: "100%",
    flexGrow: 1,
    backgroundImage: `url('${window.location.origin}/public/wallpaper.png')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left",
    backgroundAttachment: "fixed",
    backgroundSize: "cover"
  },
  hiddenFilters: {
    display: "none"
  },
  filtersContainer: {
    position: "absolute",
    zIndex: 1000,
    top: theme.spacing(-1.5),
    right: theme.spacing(4),
    width: "20rem",
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      width: "100%",
      right: 0
    }
  }
}));

export const useHeaderStyles = makeStyles((theme) => ({
  appBar: {
    height: "64px",
    display: "flex",
    justifyContent: "center"
  },
  titleLink: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  buttonsMenu: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end"
    }
  },
  linksContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  title: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  linkMedia: {
    margin: theme.spacing(0, 0.5)
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  searchInput: {
    background: theme.palette.grey[700],
    height: theme.spacing(5),
    width: "20rem",
    [theme.breakpoints.down("sm")]: {
      width: "15rem"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  flagIcon: {
    lineHeight: 0
  },
  inputLabel: {
    marginRight: theme.spacing(1),
    pointerEvents: "none"
  },
  headerButtons: {
    color: theme.palette.grey[700],
    marginLeft: theme.spacing(1),
    height: theme.spacing(6),
    width: theme.spacing(6),
    "&:hover": {
      background: theme.palette.grey[800]
    }
  },
  toggleContent: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0, 1.5),
    cursor: "pointer"
  },
  thumb: {
    color: theme.palette.primary.main
  },
  switchMovies: {
    backgroundColor: deepPurple[500]
  },
  switchShows: {
    backgroundColor: cyan[500]
  }
}));

export const useFiltersStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: theme.spacing(4, 3, 6.5, 3)
  },
  collectionsContainer: {
    marginBottom: theme.spacing(2),
    width: "100%"
  },
  filtersComponent: {
    width: "100%"
  },
  yearItem: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  },
  ratingContainer: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-evenly"
    }
  },
  resetFilterButton: {
    float: "right"
  }
}));
