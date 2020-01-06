import { useEffect, useState } from "react";

import API from "../util/api";

import { Fixture, ApiRecord } from "../models/models";

const useApi = (initialUrl: string, fixture?: Fixture): ApiRecord => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    if (fixture) {
      setData(fixture.data);
      setLoading(fixture.loading);
      setError(fixture.error);
    } else if (url) {
      setLoading(true);
      setError(null);

      API.get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [fixture, url]);
  return { data, loading, error, setUrl };
};

export default useApi;
