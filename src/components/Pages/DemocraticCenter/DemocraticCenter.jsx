import React from "react";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import { useStaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import vid from "../../../../static/assets/vids/dummyvid.mp4";

function DemocraticCenter() {
  const data = useStaticQuery(graphql`
    query DemocraticCenterQuery {
      allMdx(filter: { fields: { dir: { eq: "democratic-center" } } }) {
        edges {
          node {
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
  const { frontmatter, body } = pageNode;
  const { title, images } = frontmatter;

  return (
    <Page>
      <Page.Header>
        <div className="text-center flex flex-col justify-center relative">
          <video autoPlay muted loop>
            <source src={vid} type="video/mp4" />
          </video>
          <div className="absolute bg-blue-300 inset-0 opacity-50 full" />
          <div className="absolute text-white text-3xl sm:text-4xl md:text-5xl w-full m-auto">
            {title}
          </div>
        </div>
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

export default DemocraticCenter;