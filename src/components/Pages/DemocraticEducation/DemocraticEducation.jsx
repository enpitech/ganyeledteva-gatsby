import React from "react";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import { useStaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "../../SEO";

function DemocraticEducation() {
  const data = useStaticQuery(graphql`
    query DemocEducQuery {
      allMdx(filter: { fields: { dir: { eq: "democraticeducation" } } }) {
        edges {
          node {
            fields {
              dir
            }
            frontmatter {
              title
              subtitle
              images {
                alt
                src
              }
            }
            body
          }
        }
      }
    }
  `);

  const pageNode = data.allMdx.edges[0].node;
  const { frontmatter, body, fields } = pageNode;
  const { title, subtitle, images } = frontmatter;

  const pageSEOData = {
    title: title,
    description: undefined,
    image: undefined,
    pagePath: fields.dir,
  };

  return (
    <Page>
      <SEO pageSEOData={pageSEOData} />
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-blue-300 to-blue-100"
          backgroundPatternClass="bg-patt2"
        />
      </Page.Header>
      <Page.Main className="md:flex justify-center">
        <div className="md:w-3/7 ml-10">
          <MDXRenderer>{body}</MDXRenderer>
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
  );
}

export default DemocraticEducation;
