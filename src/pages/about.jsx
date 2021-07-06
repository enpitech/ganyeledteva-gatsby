import React from "react";
import Layout from "../layout";
import About from "../components/Pages/About/About";

function AboutPage() {
  return (
    <Layout>
      <div className="about-container">
        <About />
      </div>
    </Layout>
  );
}

export default AboutPage;
