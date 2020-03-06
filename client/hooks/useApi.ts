import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError, CancelTokenSource } from "axios";

import API from "../util/api";

import {
  UseApiOption,
  Method,
  Headers,
  Data,
  UseApiReturn
} from "../models/models";

/*
 ** T is the api response type
 ** E is the api error reponse type
 */
const useApi = <T, E>(
  initialUrl: string,
  option?: UseApiOption
): UseApiReturn<T, E> => {
  // Request param
  const [url, setUrl] = useState(initialUrl);
  const [method, setMethod] = useState<Method>(option?.method || "get");
  const [headers, setHeaders] = useState<Headers>(option?.headers || undefined);
  const [data, setData] = useState<Data>(option?.data || undefined);

  // Response
  const [loading, setLoading] = useState<boolean>(
    initialUrl && option?.hotReload
  );
  const [error, setError] = useState<AxiosError<E>>(null);
  const [res, setRes] = useState<AxiosResponse<T>>(null);

  // Other
  const [cancelSource] = useState<CancelTokenSource>(
    axios.CancelToken.source()
  );

  const callApi = async (freshData?: Data): Promise<void> => {
    setLoading(true);
    setRes(null);
    setError(null);

    try {
      const response = await API({
        url,
        method,
        headers,
        data: freshData || data,
        validateStatus: option?.validateStatus || undefined,
        cancelToken: cancelSource.token
      });
      setRes(response);
      setLoading(false);
    } catch (e) {
      if (e.isAxiosError) {
        setError(e);
        setLoading(false);
      } else if (!axios.isCancel(e)) {
        // If it's not an axios error or a canceld axios request, we throw it
        throw e;
      }
    }
  };

  useEffect(() => {
    if (url && option?.hotReload) {
      callApi();
    }
  }, [url, method, headers, data]);

  return {
    callApi,
    loading,
    res,
    resData: res?.data || null,
    error,
    setUrl,
    setMethod,
    setHeaders,
    setData,
    cancelAllRequests: cancelSource.cancel
  };
};

export default useApi;
