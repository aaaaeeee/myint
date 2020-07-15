import React from 'react';

import Layout from '../layout/Layout';
import Routes from '../routes/Routes';
import AuthIsLoaded from '../components/common/AuthIsLoaded';

const App = () => {
  return (
    <AuthIsLoaded>
      <Layout>
        <Routes />
      </Layout>
    </AuthIsLoaded>
  );
};

export default App;
