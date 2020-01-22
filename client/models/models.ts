import { AxiosError } from "axios";

export interface Locale {
  locale: string;
  setLocale: (locale: string) => void;
}
export interface Fixture {
  data: {};
  loading: boolean;
  error: {};
}

export interface UseApiReturn<T, E> {
  data: T;
  loading: boolean;
  error: AxiosError<E>;
}

export interface ApiAuthResponse {
  validToken: boolean;
  error?: string;
}
