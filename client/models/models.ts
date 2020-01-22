import { AxiosError } from "axios";

export interface Locale {
  locale: string;
  setLocale: (locale: string) => void;
}

export interface UseApiReturn<T, E> {
  data: T;
  loading: boolean;
  error: AxiosError<E>;
  setUrl: (url: string) => void;
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
