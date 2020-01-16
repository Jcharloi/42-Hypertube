import qs from "qs";

export const clamp = (str: string, maxLength: number): string =>
  str
    ? `${str.slice(0, maxLength)}${str.length <= maxLength ? "" : "..."}`
    : "";

export const formatQueryUrl = (
  search: string,
  page: number,
  mediaType: string
): string => {
  const { query, collections, year, minRating } = qs.parse(search.slice(1));

  return `/search/${mediaType}?${qs.stringify({
    query: query || undefined,
    collections: collections || undefined,
    year: year || undefined,
    minRating: minRating === 0 ? undefined : minRating,
    page
  })}`;
};
