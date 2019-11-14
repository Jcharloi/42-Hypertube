
import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TopMenu from './TopMenu';

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props): ReactElement => (
  <div>

    <TopMenu />
    {children}
  </div>
);

export default Layout;
