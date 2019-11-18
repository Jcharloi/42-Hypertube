import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';

const Authentication = (): ReactElement => (
  <div>
    <Link to="/">Not authenticated</Link>
    <SignUp />
    <SignIn />
    <ResetPassword />
  </div>
);

export default Authentication;
