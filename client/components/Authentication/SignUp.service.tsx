import { AxiosPromise } from "axios";

import API from "../../util/api";
import {
  requiredErrorKey,
  requiredPictureErrorKey,
  emailInvalidErrorKey,
  passwordInvalidErrorKey,
  usernameTakenErrorKey,
  emailTakenErrorKey
} from "./errorKey";

export interface UserInfo {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: File;
  [key: string]: string | File;
}

export interface UserError {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  [key: string]: string;
}

export interface ApiData {
  missingInfos: boolean;
  nameTaken: boolean;
  emailTaken: boolean;
}

const serverError = [usernameTakenErrorKey, emailTakenErrorKey];

export const checkRequiredField = (
  userInfo: UserInfo,
  newUserError: UserError
): UserError => {
  const newUserErrorCopy: UserError = { ...newUserError };
  const keys: string[] = Object.keys(userInfo);

  keys.forEach((key) => {
    if (key === "picture" && !userInfo.picture) {
      newUserErrorCopy.picture = requiredPictureErrorKey;
    } else if (userInfo[key] === "") {
      newUserErrorCopy[key] = requiredErrorKey;
    }
  });

  return newUserErrorCopy;
};

export const validateEmail = (email: string): boolean => {
  const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return reg.test(email);
};

export const validatePassword = (password: string): boolean => {
  const reg = /(?=^.{8,}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z]))((?=(.*\d){1,})|(?=(.*\W){1,}))^.*$/;
  return reg.test(password);
};

/**
 * Check if all field are field and if email/password are valid
 */
export const checkErrors = (
  userInfo: UserInfo,
  userError: UserError
): UserError => {
  let newUserError: UserError = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    picture: ""
  };
  const keys: string[] = Object.keys(userError);

  // Just keeping error that are verified by server
  keys.forEach((key) => {
    if (serverError.includes(userError[key])) {
      newUserError[key] = userError[key];
    }
  });

  newUserError = checkRequiredField(userInfo, newUserError);
  if (newUserError.email === "" && !validateEmail(userInfo.email)) {
    newUserError.email = emailInvalidErrorKey;
  }
  if (newUserError.password === "" && !validatePassword(userInfo.password)) {
    newUserError.password = passwordInvalidErrorKey;
  }

  return newUserError;
};

/**
 * Check if the picture has a valid type and is not to heavy (1Mo max)
 */
export const getPictureError = (picture: File): string => {
  const ext = picture.name.split(".").pop();

  if (picture.size > 1000000) {
    return "authentication.signUp.error.picture.tooHeavy";
  }
  if (
    !(picture.type === "image/png" && ext === "png") &&
    !(picture.type === "image/jpeg" && (ext === "jpeg" || ext === "jpg"))
  ) {
    return "authentication.signUp.error.picture.wrongType";
  }
  return "";
};

export const isThereError = (userError: UserError): boolean => {
  const keys: string[] = Object.keys(userError);
  let error = false;

  keys.forEach((key) => {
    if (userError[key] !== "") {
      error = true;
    }
  });
  return error;
};

export const sendSignUpData = (
  userInfo: UserInfo,
  locale: string
): AxiosPromise<ApiData> => {
  const data = new FormData();
  const keys: string[] = Object.keys(userInfo);

  keys.forEach((key) => {
    data.append(key, userInfo[key]);
  });
  data.append("locale", locale);
  return API({
    method: "post",
    url: "/inscription",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
};
