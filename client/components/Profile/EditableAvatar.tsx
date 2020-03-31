import React, { ReactElement, useState, ChangeEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { AxiosPromise } from "axios";
import useStyles from "./Profile.styles";
import API from "../../util/api";

interface Props {
  picture?: string;
}

interface ApiResponse {
  id: string;
}

export const sendPictureData = (picture: File): AxiosPromise<ApiResponse> => {
  const data = new FormData();
  console.log("AGNEUGEGEGE", picture);
  data.append("image", picture, picture.name);
  return API({
    method: "post",
    url: "/change-picture",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
};

const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
  if (e.target.type === "file") {
    sendPictureData(e.target.files[0])
      .then(() => {
        console.log("file sent");
      })
      .catch(({ response: { data } }) => {
        console.log("could not send file", data);
      });
  }
};

const EditableAvatar = ({ picture }: Props): ReactElement => {
  const classes = useStyles({});
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <div
      onMouseEnter={(): void => setMouseIn(true)}
      onMouseLeave={(): void => setMouseIn(false)}
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
