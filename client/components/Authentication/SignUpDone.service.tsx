import { AxiosPromise } from "axios";

import API from "../../util/api";
import { UserInfo } from "./SignUp.service";

export interface User extends UserInfo {
  id: string;
}

const resendConfrimationEmail = (id: string, locale: string): AxiosPromise => {
  return API.put(`users/${id}/send-validation-email`, { locale });
};

export default resendConfrimationEmail;
