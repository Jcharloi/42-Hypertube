export interface Locale {
  locale: string;
  setLocale: (locale: string) => void;
}

export interface Fixture {
  data: {};
  loading: boolean;
  error: {};
}

export interface Review {
  name: string;
  month: string;
  day: string;
  year: string;
  stars: number;
  body: string;
}
