import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import FAQ from '../components/Pages/FAQ';
import config from '../../data/SiteConfig';

function FAQPage() {
  return (
    <Layout>
      <Helmet title={`שאלות ותשובות | ${config.siteTitle}`} />
      <FAQ />
    </Layout>
  );
}

export default FAQPage;
