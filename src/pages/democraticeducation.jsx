import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import DemocraticEducation from '../components/Pages/DemocraticEducation/DemocraticEducation';

function DemocraticEducationPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`הגישה הדמוקרטית | ${config.siteTitle}`} />
        <DemocraticEducation />
      </div>
    </Layout>
  );
}

export default DemocraticEducationPage;
