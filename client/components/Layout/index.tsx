import * as React from 'react';
import TopMenu from './TopMenu';

import styles from './styles.css';

// eslint-disable-next-line
const Layout = ({ children, locale, setLocale }) => (
  <div>

    <TopMenu locale={locale} setLocale={setLocale} />

  </div>
);

export default Layout;
