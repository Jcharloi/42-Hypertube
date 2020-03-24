import React, { ReactElement, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import API from "../../util/api";
import useApi from "../../hooks/useApi";
import Loading from "../Routes/Loading";
import Error from "../Error";
import useStyles from "./Profile.styles";
import ShowComments from "./ShowComments";
import OnClickInput from "./OnClickInput";
import Password from "./Password";
import EditableAvatar from "./EditableAvatar";

interface UrlParam {
  username: string;
}
interface Comment {
  movieName: string;
  date: number;
  name: string;
  body: string;
  stars: number;
  _id: number;
}

interface User {
  username: string;
  firstName: string;
  email: string;
  lastName: string;
  picture: string;
}

const MyProfile = (): ReactElement => {
  // const userId = "5deef4dc80a440152717dbcf";

  const { data } = useApi<User>(`/user/`);
  const { username } = data || {};
  const classes = useStyles({});
  const [changingPassword, setChangingPassword] = useState(false);

  const updateInfo = (value: string, name: string): void => {
    if (value && name) {
      API.put("/edit-profile", { [name]: value })
        .then(() => {})
        .catch(e => {
          console.error(e);
        });
    }
  };
  return (
    <div className={classes.containerProfile}>
      <Paper className={classes.containerUser}>
        <EditableAvatar picture={data?.picture} />
        <div className={classes.containerInfo}>
          <div className={classes.containerFullname}>
            <h1>
              <OnClickInput
                autocomplete="given-name"
                startValue={data?.firstName}
                label="First name"
                name="firstName"
                updateInfo={updateInfo}
              />
            </h1>
            <h1>
              <OnClickInput
                autocomplete="family-name"
                updateInfo={updateInfo}
                startValue={data?.lastName}
                label="Last name"
                name="lastName"
              />
            </h1>
          </div>

          <OnClickInput
            autocomplete="email"
            updateInfo={updateInfo}
            startValue={data?.email}
            label="Email"
            name="email"
          />
          <p>{data?.username}</p>
          <Button
            onClick={() => {
              setChangingPassword(val => {
                return !val;
              });
            }}
          >
            Change Password
          </Button>
          {changingPassword && <Password />}
        </div>
      </Paper>
      <ShowComments username={username} />
    </div>
  );
};

export default MyProfile;
