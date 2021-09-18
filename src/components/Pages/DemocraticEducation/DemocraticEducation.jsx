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
          backgroundColorClass="bg-blue-democ-educ-header"
          backgroundPatternClass="bg-patt2"
          textWhite
        />
      </Page.Header>
      <Page.Main className="flex flex-col md:flex-row justify-center">
        <div className="mx-10 md:w-3/7 md:ml-10">
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
