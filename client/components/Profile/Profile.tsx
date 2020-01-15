import React, { ReactElement, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Avatar } from "@material-ui/core";
import API from "../../util/api";
import useApi from "../../hooks/useApi";
import useStyles from "./Profile.styles";

interface UrlParam {
  username: string;
}

const Profile = ({
  match: {
    params: { username }
  }
}: RouteComponentProps<UrlParam>): ReactElement => {
  const { data, loading, error, setUrl } = useApi(`/user/${username}`);
  const classes = useStyles({});
  console.log(data.picture);
  return (
    <div>
      <Avatar
        alt="Test"
        src={`${window.location.origin}/api/data/avatar/${data.picture}`}
        className={classes.large}
      />
      <p>{data.username}</p>
      <p>{data.firstName}</p>
      <p>{data.lastName}</p>
    </div>
  );
};

export default Profile;
