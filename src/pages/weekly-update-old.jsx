import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';

function WeeklyUpdatePage() {
  return (
    <Layout>
      <div>
        <Helmet title={`העדכון השבועי | ${config.siteTitle}`} />
      </div>
    </Layout>
  );
}

export default WeeklyUpdatePage;
