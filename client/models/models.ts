import { AxiosResponse, AxiosError, Canceler } from "axios";

export interface Locale {
  locale: string;
  setLocale: (locale: string) => void;
}

export type Method = "get" | "put" | "post" | "patch" | "delete";
export type Headers = { [key: string]: string } | undefined;
export type Data = object | undefined;

export interface UseApiOption {
  method?: Method;
  headers?: Headers;
  data?: Data;
  hotReload?: boolean;
  validateStatus?: (status: number) => boolean;
}

export interface UseApiReturn<T, E> {
  callApi: (freshData?: Data) => Promise<void>;
  loading: boolean;
  res: AxiosResponse<T>;
  resData: T;
  error: AxiosError<E>;
  setUrl: (url: string) => void;
  setMethod: (method: Method) => void;
  setHeaders: (headers: Headers) => void;
  setData: (data: Data) => void;
  cancelAllRequests: Canceler;
}

export interface ApiAuthResponse {
  validToken: boolean;
  error?: string;
}

export interface Review {
  id: string;
  name: string;
  date: number;
  stars: number;
  body: string;
}

export interface Film {
  title: string;
  avg_rating: number;
  date: string;
  creator: string;
  subject: string | string[];
  description: string;
  identifier: string;
}

export interface Filters {
  query: string;
  collections: string[];
  startYear: number;
  endYear: number;
  minRating: number;
  maxRating: number;
}

export interface ClickAwayEventTarget extends EventTarget {
  target: { id: string };
}
