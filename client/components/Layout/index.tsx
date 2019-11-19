
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
  locale: string;
  setLocale: (locale: string) => void;
}

const Layout = ({ children, locale, setLocale }: Props): ReactElement => (
  <div>

    <TopMenu locale={locale} setLocale={setLocale} />

  </div>
);

export default Layout;
