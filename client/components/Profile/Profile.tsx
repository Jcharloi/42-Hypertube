import React, { ReactElement } from "react";
import { RouteComponentProps } from "react-router";

interface UrlParam {
  username: string;
}

const Profile = ({
  match: {
    params: { username }
  }
}: RouteComponentProps<UrlParam>): ReactElement => {
  console.log(username);
  return (
    <div>
      <p>test</p>
      <p>tesadsdfst2</p>
    </div>
  );
};

export default Profile;
