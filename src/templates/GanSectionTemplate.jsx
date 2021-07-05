import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import PageHeader from "../components/Page/PageHeader";
import Page from "../components/Page/Page";
import { MDXRenderer } from "gatsby-plugin-mdx";
const headerMdFileName = config.ganMainPageDataMdFileName;

export default function GanSectionTemplate({ data, pageContext }) {
  const { mdx: activeGanSection, allMdx: ganSections } = data;
  const sectionsData = [];
  ganSections.edges.forEach((sectionEdge) => {
    sectionsData.push({
      filename: sectionEdge.node.fields.filename,
      title: sectionEdge.node.frontmatter.title,
      path: sectionEdge.node.fields.slug,
    });
  });

  const { slug } = pageContext;
  const sectionsNode = activeGanSection;
  const section = sectionsNode.frontmatter;
  const images = section.images;
  if (!section.id) {
    section.id = slug;
  }

  const postSEOData = { postPath: slug, postNode: sectionsNode };

  return (
    <Layout>
      <Helmet>
        <title>{`${section.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postSEOData={postSEOData} />
      <Page>
        <Page.Header className="border-b-8 border-yellow-gan-section-header-border">
          <PageHeader
            title={section.title}
            backgroundColorClass="bg-gradient-to-r from-yellow-gan-section-header to-green-gan-section-header"
            backgroundPatternClass="bg-patt2"
          />
        </Page.Header>
        <Page.Main className="md:flex justify-center pb-20">
          <div className="md:w-3/7 ml-10">
            <MDXRenderer>{sectionsNode.body}</MDXRenderer>
            <BottomNavMenu
              sectionsData={sectionsData}
              activeSectionTitle={section.title}
            />
          </div>
          <div className="md:w-2/7 mt-4">
            {images.map((img, index) => (
              <div
                key={`${(img.src, index)}`}
                className="my-5 lg:mx-5 shadow-img"
              >
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </Page.Main>
      </Page>
    </Layout>
  );
}

const BottomNavMenu = ({ sectionsData, activeSectionTitle }) => {
  const activeSectionStyle = "text-purple-light-border opacity-40";
  const nonActiveSectionStyle = "hover:text-purple-border";
  return (
    <div className="border-t-2 pt-4 mt-6">
      <div className="text-red-link text-3xl">עוד בנושא...</div>
      <div className="text-2xl">
        {sectionsData.map((section, index) => {
          if (section.filename !== headerMdFileName) {
            return (
              <div
                key={index}
                className={`my-1 ${
                  section.title === activeSectionTitle
                    ? activeSectionStyle
                    : nonActiveSectionStyle
                }`}
              >
                <Link to={section.path}>> {section.title}</Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ganPostBySlugAndGanPostsListQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        images {
          alt
          src
        }
      }
      fields {
        slug
      }
    }
    allMdx(filter: { fields: { dir: { eq: "gan" } } }) {
      edges {
        node {
          fields {
            slug
            filename
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
