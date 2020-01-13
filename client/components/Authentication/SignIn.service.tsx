import { AxiosPromise } from "axios";

import API from "../../util/api";
import { requiredErrorKey } from "./errorKey";

export interface AuthInfo {
  username: string;
  password: string;
  [key: string]: string;
}

export const checkErrors = (authInfo: AuthInfo): AuthInfo => {
  return {
    username: authInfo.username ? "" : requiredErrorKey,
    password: authInfo.password ? "" : requiredErrorKey
  };
};

export const sendAuth = (data: AuthInfo): AxiosPromise => {
  return API.post("/user/login", data);
};
