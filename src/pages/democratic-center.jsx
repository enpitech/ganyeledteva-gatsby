import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import DemocraticCenter from "../components/Pages/DemocraticCenter/DemocraticCenter";

function DemocraticCenterPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`חדשנות חינוכית לגיל הרך | ${config.siteTitle}`} />
        <DemocraticCenter />
      </div>
    </Layout>
  );
}

export default DemocraticCenterPage;
