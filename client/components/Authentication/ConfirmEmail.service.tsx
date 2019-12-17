import { AxiosPromise } from "axios";

import API from "../../util/api";

const verifiyEmail = (id: string): AxiosPromise<boolean> => {
  return API.put(`/tokens/${id}/verify-email`);
};

export default verifiyEmail;