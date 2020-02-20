export interface Locale {
  locale: string;
  setLocale: (locale: string) => void;
}

export interface ApiRecord {
  data: Record<string, unknown>;
  loading: boolean;
  error: {};
  setUrl: (url: string) => void;
}

export interface Fixture {
  data: {};
  loading: boolean;
  error: {};
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
