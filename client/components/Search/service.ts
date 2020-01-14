import qs from "qs";
import moment from "moment";

export const clamp = (str: string, maxLength: number): string =>
  str
    ? `${str.slice(0, maxLength)}${str.length <= maxLength ? "" : "..."}`
    : "";

export const formatQueryUrl = (search: string, page: number): string => {
  const {
    query,
    collections,
    startYear,
    endYear,
    minRating,
    maxRating
  } = qs.parse(search.slice(1));

  return `/search?${qs.stringify({
    query: query || undefined,
    collections: collections || undefined,
    startYear:
      startYear === 1900 && endYear === moment().year() ? undefined : startYear,
    endYear:
      startYear === 1900 && endYear === moment().year() ? undefined : endYear,
    minRating: minRating === 0 && maxRating === 5 ? undefined : minRating,
    maxRating: minRating === 0 && maxRating === 5 ? undefined : maxRating,
    page
  })}`;
};
