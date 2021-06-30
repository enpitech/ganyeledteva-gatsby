import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import WorkInGan from "~src/components/Pages/WorkInGan";

function WorkInGanPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`לעבוד בגן ילדי הטבע | ${config.siteTitle}`} />
        <WorkInGan />
      </div>
    </Layout>
  );
}

export default WorkInGanPage;
