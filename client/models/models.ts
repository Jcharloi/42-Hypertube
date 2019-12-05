export interface Locale {
  locale: string;
  setLocale: (locale: string) => void;
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
  prodDate: string;
  runTime: string;
  stars: number;
}