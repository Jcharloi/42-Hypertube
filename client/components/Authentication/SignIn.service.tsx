import { requiredErrorKey } from "./errorKey";
import { AuthInfo } from "../../models/models";

export const checkErrors = (authInfo: AuthInfo): AuthInfo => {
  return {
    username: authInfo.username ? "" : requiredErrorKey,
    password: authInfo.password ? "" : requiredErrorKey
  };
};

export default { checkErrors };
