import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';

function SignupPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`הרשמה | ${config.siteTitle}`} />
      </div>
    </Layout>
  );
}

export default SignupPage;
