import React, { ReactElement } from 'react';

import useApi from '../../hooks/useApi';

import Authentication from '../Authentication/Authentication';

const Home = (): ReactElement => {
  const { data: { validToken }, loading, error } = useApi('http://localhost:8080/API/check-token');

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (!validToken) {
    return <Authentication />;
  }

  return (
    <div>
            Home sweet home;
    </div>
  );
};

export default Home;
