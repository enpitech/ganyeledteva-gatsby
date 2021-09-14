import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "../../SEO";
import Page from "../../Page/Page";
import { MDXProvider } from "@mdx-js/react";
import TadmitVideo from "../../TadmitVideo";
import { mdStyleWithInternalLinks } from "../../../styles/mdxStyles";

function DemocraticCenter() {
  const data = useStaticQuery(graphql`
    query DemocraticCenterQuery {
      allMdx(filter: { fields: { dir: { eq: "democratic-center" } } }) {
        edges {
          node {
            fields {
              dir
            }
            frontmatter {
              title
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
  const { title, images } = frontmatter;

  const pageSEOData = {
    title,
    description: undefined,
    image: undefined,
    pagePath: fields.dir,
  };

  return (
    <Page>
      <SEO pageSEOData={pageSEOData} />
      <Page.Header>
        <div className="text-center flex flex-col justify-center relative">
          <TadmitVideo
            tadmitVideo={"https://www.youtube.com/watch?v=SjA_iOhWHe4"}
            className="w-full"
            mute
          />
          <div className="absolute bg-blue-300 inset-0 opacity-50 full" />
          <div className="absolute md:top-1/3 text-white text-3xl sm:text-4xl md:text-5xl w-full m-auto">
            {title}
          </div>
        </div>
      </Page.Header>
      <Page.Main className="md:flex justify-center">
        <div className="md:w-3/7 ml-10">
          <MDXProvider components={mdStyleWithInternalLinks}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
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

export default DemocraticCenter;
