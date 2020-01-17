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

export interface MovieInfos {
  title: string;
  description: string;
  creator: string;
  runTime: number;
  prodDate: string;
  imdbRating: number;
  poster: string;
}

export interface Reviews {
  movieRating: number;
  review: Array<Review>;
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
  addEventListener: () => boolean;
  dispatchEvent: () => boolean;
  removeEventListener: () => boolean;
  target: { id: string };
}
