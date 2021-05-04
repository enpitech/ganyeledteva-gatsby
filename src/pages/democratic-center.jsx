import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';

function DemocraticCenterPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`חדשנות חינוכית לגיל הרך | ${config.siteTitle}`} />
      </div>
    </Layout>
  );
}

export default DemocraticCenterPage;
