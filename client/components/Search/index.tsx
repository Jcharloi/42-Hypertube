import React, { ReactElement, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";
import Thumbnail from "./Thumbnail";

import useApi from "../../hooks/useApi";

const useStyles = makeStyles({
  thumbsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: 20
  }
});

const Search = (): ReactElement => {
  const { data, loading, error } = useApi("http://localhost:8080/API/getFilms");
  const classes = useStyles();

  const [modaleData, setmodaleData] = useState(null);

  console.log(modaleData);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>error</div>;
  }

  console.log(data);
  return (
    <div>
      Found {data.numFound} items !{" "}
      <div className={classes.thumbsContainer}>
        {data?.docs?.map((film) => {
          return (
            <Thumbnail
              key={film.identifier}
              film={film}
              onClick={() => setmodaleData(film)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
