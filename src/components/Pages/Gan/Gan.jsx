import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Page from '../../Page/Page';
import PageHeader from '../../Page/PageHeader';
import Layout from '../../../layout';
import SEO from '../../SEO';
import config from '../../../../data/SiteConfig';
import SectionCard from '../../SectionCard';

const headerMdFileName = config.ganMainPageDataMdFileName;

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
      dir: sectionEdge.node.fields.dir,
    });
  });

  const mainPageHeader = sectionList.filter(
    (section) => section.filename === headerMdFileName
  )[0];

  const { title: pageTitle, img: pageImage, dir: pagePath } = mainPageHeader;

  const pageSEOData = {
    title: pageTitle,
    description: undefined,
    image: pageImage,
    pagePath,
  };

  return (
    <Layout>
      <Helmet>
        <title>{`${pageTitle} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pageSEOData={pageSEOData} />
      <Page>
        <Page.Header>
          <PageHeader
            title={pageTitle}
            subtitle={mainPageHeader.subtitle}
            backgroundColorClass="bg-yellow-gan-page-header"
            backgroundPatternClass="bg-patt1"
            textWhite
          />
        </Page.Header>
        <Page.Main>
          <div className="md:w-9/12 m-auto pb-1">
            {sectionList.map((section) => {
              const { title, subtitle, path, link, img } = section;
              return section.filename !== headerMdFileName ? (
                <div key={title} className="mt-10 mb-16 md:mb-40">
                  <SectionCard
                    className="flex flex-col md:flex-row justify-between"
                    title={title}
                    subtitle={subtitle}
                    path={path}
                    link={link}
                    img={img}
                  />
                </div>
              ) : null;
            })}
          </div>
        </Page.Main>
      </Page>
    </Layout>
  );
}

export default Gan;

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
