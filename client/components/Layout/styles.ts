import { makeStyles } from "@material-ui/core/styles";

export const useLayoutStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  bodyContainer: {
    height: "calc(100vh - 64px)"
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
    padding: "0 8px"
  },
  resetFilterButton: {
    float: "right"
  }
});
