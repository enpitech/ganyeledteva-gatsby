import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import Signup from '../components/Pages/Signup';

function SignupPage() {
  return (
    <Layout>
      <Helmet title={`הרשמה | ${config.siteTitle}`} />
      <Signup />
    </Layout>
  );
}

export default SignupPage;
