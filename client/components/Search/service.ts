import qs from "qs";

export const formatQueryUrl = (search: string, page: number): string => {
  return `/movies${search}${search ? "&" : "?"}${qs.stringify({ page })}`;
};

export default { formatQueryUrl };
