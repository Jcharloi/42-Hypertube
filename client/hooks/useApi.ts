import { useEffect, useState } from "react";

import API from "../util/api";

import { UseApiReturn, Fixture } from "../models/models";

/*
 ** T is the api response type
 ** E is the api error reponse type
 */
const useApi = <T, E>(
  initialUrl: string,
  fixture?: Fixture
): UseApiReturn<T, E> => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!initialUrl);
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
