import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';

const Authentification = (): ReactElement => (
  <div>
    <Link to="/home">grgregr</Link>
    <SignUp />
    <SignIn />
    <ResetPassword />
  </div>
);

export default Authentification;
