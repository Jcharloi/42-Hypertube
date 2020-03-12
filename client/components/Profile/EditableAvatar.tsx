import React, { ReactElement, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import useStyles from "./Profile.styles";
import API from "../../util/api";
import {
  UserInfo,
  UserError,
  checkErrors,
  getPictureError,
  isThereError,
  sendSignUpData
} from "../Authentication/SignUp.service";

interface Props {
  picture?: string;
}

export const sendPictureData = (picture: any): AxiosPromise<ApiData> => {
  const data = new FormData();
  const keys: string[] = Object.keys(picture);
  keys.forEach((key) => {
    data.append(key, picture[key]);
  });
  return API({
    method: "put",
    url: "/change-picture",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
};

const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
  if (e.target.type === "file") {
    const picErr = e.target.files[0] ? getPictureError(e.target.files[0]) : "";
    console.log(e.target.files[0]);
    // API.put("/change-picture/", e.target.files[0])
    //   .then(() => {
    //     console.log("api called");
    //   })
    //   .catch((k) => {
    //     console.error(k);
    //     console.log(k.response.status);
    //   });
    sendPictureData(e.target.files[0])
      .then(() => {
        console.log("OK");
      })
      .catch(({ response: { data } }) => {
        console.log("KO", data);
      });
  }
};

const EditableAvatar = ({ picture }: Props): ReactElement => {
  const classes = useStyles({});
  const [mouseIn, setMouseIn] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
      className={classes.containerPicture}
    >
      <label htmlFor="raised-button-file">
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          name="picture"
          onChange={handleInputChange}
        />
        <Avatar
          alt="Test"
          src={`${window.location.origin}/api/data/avatar/${picture}`}
          className={classes.large}
        />
        {mouseIn ? (
          <AddAPhotoIcon
            style={{ fontSize: 150 }}
            className={classes.changePhoto}
          />
        ) : null}
      </label>
    </div>
  );
};

export default EditableAvatar;
