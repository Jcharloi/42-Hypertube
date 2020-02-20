import { AxiosPromise } from "axios";

import API from "../../util/api";

const verifiyEmail = (id: string): AxiosPromise<undefined> => {
  return API.put<undefined, undefined>(`/tokens/${id}/verify-email`);
};

export default verifiyEmail;
