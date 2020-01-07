import { makeStyles } from "@material-ui/core/styles";

export const useLayoutStyles = makeStyles(() => ({
  background: {
    position: "fixed",
    height: "calc(100% - 64px)",
    marginTop: 64,
    top: 0,
    left: 0,
    width: "100%",
    backgroundImage: "url('http://localhost:8080/public/wallpaper.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left",
    backgroundAttachment: "fixed",
    backgroundSize: "cover"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  bodyContainer: {
    height: "100%"
  }
}));

export const useFiltersStyles = makeStyles({
  noFiltersHolder: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: "0",
    left: "100%",
    height: "100%"
  },
  filterContainerTop: {
    padding: "24px 24px",
    paddingBottom: 48,
    width: "100%",
    marginBottom: 24
  },
  filterContainer: {
    margin: "8px 0"
  },
  yearRangeLabel: {
    marginBottom: "40px"
  },
  collectionsSelect: {},
  collectionsSelectComponent: {
    width: "100%"
  },
  cancel: {
    position: "absolute",
    top: "8px",
    left: "8px"
  },
  input: {
    width: "20rem",
    padding: "0 8px"
  },
  resetFilterButton: {
    float: "right"
  }
});
