import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Products from "~src/components/Pages/Products";

function ProductsPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`מוצרים חינוכיים | ${config.siteTitle}`} />
        <Products />
      </div>
    </Layout>
  );
}

export default ProductsPage;
