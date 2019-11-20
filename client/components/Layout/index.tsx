import React, { ReactElement } from "react";

import TopMenu from "./TopMenu";

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props): ReactElement => (
  <div>
    <TopMenu />
  </div>
);

export default Layout;
