import React, { ReactElement } from "react";
import { RouteComponentProps } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import useApi from "../../hooks/useApi";
import Loading from "../Routes/Loading";
import Error from "../Error";
import ShowComments from "./ShowComments";
import useStyles from "./Profile.styles";

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

const Profile = ({
  match: {
    params: { username }
  }
}: RouteComponentProps<UrlParam>): ReactElement => {
  const { resData: data, loading, error } = useApi(`/user/${username}`, {
    hotReload: true
  });
  const classes = useStyles({});
  // const timestampToString = (date: string) => {
  //   const date = new Date(date);
  //   const hours = date.getHours();
  // };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className={classes.containerProfile}>
      <Paper className={classes.containerUser}>
        <div className={classes.containerPicture}>
          <Avatar
            alt="Test"
            src={`${window.location.origin}/api/data/avatar/${data?.picture}`}
            className={classes.large}
          />
        </div>
        <div className={classes.containerInfo}>
          <h1>
            {data.firstName} {data.lastName}
          </h1>
          <p>{data.username}</p>
        </div>
        <Paper elevation={3} />
      </Paper>
      <ShowComments username={username} />
    </div>
  );
};

export default Profile;
