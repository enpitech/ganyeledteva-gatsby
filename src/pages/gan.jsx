import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import Gan from '../components/Pages/Gan/Gan';

function GanPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`הגן | ${config.siteTitle}`} />
        <Gan />
      </div>
    </Layout>
  );
}

export default GanPage;
