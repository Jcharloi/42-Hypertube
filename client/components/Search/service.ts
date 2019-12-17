import qs from "qs";
import moment from "moment";

import { Filters } from "../../models/models";

export const clamp = (str: string, maxLength: number): string =>
  str
    ? `${str.slice(0, maxLength)}${str.length <= maxLength ? "" : "..."}`
    : "";

export const formatUrl = (
  { query, collections, startYear, endYear, minRating, maxRating }: Filters,
  page: number
): string =>
  `/search?${qs.stringify({
    query: query || undefined,
    collections: collections.length ? collections : undefined,
    startYear:
      startYear === 1900 && endYear === moment().year() ? undefined : startYear,
    endYear:
      startYear === 1900 && endYear === moment().year() ? undefined : endYear,
    minRating: minRating === 0 && maxRating === 5 ? undefined : minRating,
    maxRating: minRating === 0 && maxRating === 5 ? undefined : maxRating,
    page
  })}`;

export default {
  clamp
};
