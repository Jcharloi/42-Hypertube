import { useEffect, useState } from "react";

import API from "../util/api";

import { UseApiReturn } from "../models/models";

/*
 ** T is the api response type
 ** E is the api error reponse type
 */
const useApi = <T, E>(initialUrl: string): UseApiReturn<T, E> => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!initialUrl);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    if (url) {
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
  }, [url]);
  return { data, loading, error, setUrl };
};

export default useApi;
