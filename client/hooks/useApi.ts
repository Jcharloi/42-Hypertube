import { useEffect, useState } from "react";

import API from "../util/api";

import { Fixture, ApiRecord } from "../models/models";

const useApi = <T>(initialUrl: string, fixture?: Fixture): ApiRecord<T> => {
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
          console.log("SEOEOFSOSE", res.data);
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
