import API from "../../util/api";

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

export const requiredErrorKey = "authentication.signUp.error.required";
export const requiredPictureErrorKey =
  "authentication.signUp.error.required.picture";
export const usernameTakenErororKey =
  "authentication.signUp.error.username.taken";
export const emailTakenErororKey = "authentication.signUp.error.email.taken";

const serveurError = [usernameTakenErororKey, emailTakenErororKey];

const checkRequiredField = (
  userInfo: UserInfo,
  newUserError: UserError
): UserError => {
  const newUserErrorCopy: UserError = { ...newUserError };
  const keys: string[] = Object.keys(userInfo);

  keys.forEach((key) => {
    if (key === "picture" && userInfo[key] === null) {
      newUserErrorCopy[key] = requiredPictureErrorKey;
    } else if (userInfo[key] === "") {
      newUserErrorCopy[key] = requiredErrorKey;
    }
  });

  return newUserErrorCopy;
};

const validateEmail = (email: string): boolean => {
  const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return reg.test(email);
};

const validatePassword = (password: string): boolean => {
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
    if (serveurError.includes(userError[key])) {
      newUserError[key] = userError[key];
    }
  });

  newUserError = checkRequiredField(userInfo, newUserError);
  if (newUserError.email === "") {
    newUserError.email = validateEmail(userInfo.email)
      ? newUserError.email
      : "authentication.signUp.error.email.invalid";
  }
  if (newUserError.password === "") {
    newUserError.password = validatePassword(userInfo.password)
      ? newUserError.password
      : "authentication.signUp.error.password.invalid";
  }

  return newUserError;
};

/**
 * Check if the picture has a valid type and is not to heavy
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

export const sendSignUpData = (userInfo: UserInfo): Promise<ApiData> => {
  const data = new FormData();
  const keys: string[] = Object.keys(userInfo);

  keys.forEach((key) => {
    data.append(key, userInfo[key]);
  });
  return API({
    method: "post",
    url: "/inscription",
    headers: { "Content-Type": "multipart/form-data" },
    data
  }).then((res) => res.data);
};
