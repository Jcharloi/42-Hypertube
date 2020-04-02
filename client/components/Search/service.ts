import qs from "qs";

export const formatQueryUrl = (
  search: string,
  page: number,
  mediaType: string
): string => {
  return `/${mediaType}${search}${search ? "&" : "?"}${qs.stringify({ page })}`;
};

export default { formatQueryUrl };
