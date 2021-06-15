import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import Contact from '../components/Pages/Contact';

function ContactPage() {
  return (
    <Layout>
      <Helmet title={`צור קשר | ${config.siteTitle}`} />
      <Contact />
    </Layout>
  );
}

export default ContactPage;
