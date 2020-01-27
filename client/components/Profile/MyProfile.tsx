import React, { ReactElement, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import API from "../../util/api";
import useApi from "../../hooks/useApi";
import Loading from "../Routes/Loading";
import Error from "../Error";
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

interface User {
  username: string;
  firstName: string;
  email: string;
  lastName: string;
  picture: string;
}

const MyProfile = ({
  match: {
    params: { username }
  }
}: RouteComponentProps<UrlParam>): ReactElement => {
  const userId = "5deef4dc80a440152717dbcf";
  const body = {
    userId
  };
  // const [data, setData] = useState({
  //   username: "",
  //   firstName: "",
  //   email: "",
  //   lastName: "",
  //   picture: ""
  // });

  // const data = null;
  // const { data, loading, error, setUrl } = useApi(
  //   `/user/5deef4dc80a440152717dbcf`
  // );
  // const [loading, setLoading] = useState(true);
  // const [arrayComments, setArrayComments] = useState([]);
  // useEffect(() => {
  //   if (loading) {
  //     setLoading(false);
  //     API.post("/user", body)
  //       .then((res) => {
  //         setData(res.data);
  //         // console.log(data)
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       });
  //   }
  // });
  const data = useApi(`/user/${userId}`);
  console.log(data);
  const data2 = useApi(`/user-comments/${data.username}`);
  // setArrayComments(Object.values(data2.data));
  const arrayComments = Object.values(data2.data);
  console.log(data.username);

  const classes = useStyles({});
  // console.log(data);
  return (
    <div className={classes.containerProfile}>
      <p>this is MY profile</p>
      <Paper className={classes.containerUser}>
        <div className={classes.containerPicture}>
          <Avatar
            alt="Test"
            src={`${window.location.origin}/api/data/avatar/${data.picture}`}
            className={classes.large}
          />
        </div>
        <div className={classes.containerInfo}>
          <h1>
            {data.firstName} {data.lastName}
          </h1>
          <p>{data.username}</p>

          {/* <p>{data.lastName}</p> */}
        </div>
        <Paper elevation={3} />
      </Paper>
      <Paper className={classes.containerHistory}>
        <h2 className={classes.titleHistory}>Last comments : </h2>
        {arrayComments.map((element: Comment) => {
          const date = new Date(element.date);
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];
          console.log(date);
          return (
            <div className={classes.containerComment}>
              <div className={classes.containerMovieInfos}>
                <Rating name="read-only" value={element.stars} readOnly />
                <Typography style={{ marginLeft: "8px" }} variant="subtitle1">
                  {element.movieName}
                </Typography>
              </div>
              <Typography className={classes.commentDate} variant="caption">
                {date.getDate()} {monthNames[date.getMonth()]}{" "}
                {date.getFullYear()}
              </Typography>
              <p>{element.body}</p>
            </div>
          );
        })}
      </Paper>
    </div>
  );
};

export default MyProfile;
