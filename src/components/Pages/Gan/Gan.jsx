import React from "react";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../../../layout";
import SEO from "../../../components/SEO/SEO";
import config from "../../../../data/SiteConfig";
const headerMdFileName = config.ganPageHeaderInfoMdFileName;

function Gan({ data }) {
  const sectionEdges = data.allMdx.edges;
  const sectionList = [];
  sectionEdges.forEach((sectionEdge) => {
    sectionList.push({
      path: sectionEdge.node.fields.slug,
      title: sectionEdge.node.frontmatter.title,
      subtitle: sectionEdge.node.frontmatter.subtitle,
      body: sectionEdge.node.body,
      img: sectionEdge.node.frontmatter.img,
      link: sectionEdge.node.frontmatter.link,
      filename: sectionEdge.node.fields.filename,
    });
  });

  const pageHeader = sectionList.filter(
    (section) => section.filename === headerMdFileName
  )[0];

  return (
    <Layout>
      <Helmet>
        <title>{`${pageHeader.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO />
      <Page>
        <Page.Header>
          <PageHeader
            title={pageHeader.title}
            subtitle={pageHeader.subtitle}
            backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
            backgroundPatternClass="bg-patt1"
          />
        </Page.Header>
        <Page.Main>
          <div className="md:w-9/12 m-auto pb-1">
            {sectionList.map((section, index) =>
              section.filename !== headerMdFileName ? (
                <div key={index} className="mt-10 mb-16 md:mb-40">
                  <Section section={section} />
                </div>
              ) : null
            )}
          </div>
        </Page.Main>
      </Page>
    </Layout>
  );
}

export default Gan;

const Section = ({ section }) => {
  return (
    <div className="flex md:flex-row flex-col justify-between">
      <div className="flex flex-col md:w-2/5">
        <h1 className="text-3xl font-bold mb-2"> {section.title} </h1>
        <p>{section.subtitle}</p>
        <Link to={section.path}>
          <div className="inline-block my-4 px-2 py-1 rounded-full  text-center border-2 border-black text-black hover:bg-red-link hover:text-white">
            {section.link}
            {" >"}
          </div>
        </Link>
      </div>
      <div className="md:w-5/12 h-2/6 mt-16 md:mt-0">
        <img className=" m-auto lg:mx-5 shadow-img h-4/5" src={section.img} />
      </div>
    </div>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query GanPageQuery {
    allMdx(filter: { fields: { dir: { eq: "gan" } } }) {
      edges {
        node {
          fields {
            slug
            date
            dir
            filename
          }
          frontmatter {
            title
            date
            img
            subtitle
            link
          }
          body
        }
      }
    }
  }
`;
