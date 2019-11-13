import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TopMenu from '../TopMenu'

import styles from './styles.css';

// eslint-disable-next-line
const Layout = ({ children }) => (
  <div>

    <TopMenu></TopMenu>

  </div>
);

export default Layout;
