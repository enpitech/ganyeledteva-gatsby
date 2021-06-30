import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import SEO from "../../SEO";
import { siteRoutes } from "../../../../data/SiteConfig";
import { useStaticQuery, graphql, Link } from "gatsby";
import TextTitle from "../../TextTitle";

export default function Products() {
  const data = useStaticQuery(graphql`
    query productsQuery {
      allMdx(filter: { fields: { dir: { eq: "products" } } }) {
        edges {
          node {
            frontmatter {
              title
              subtitle
              video1_title
              video1
              video2_title
              video2
              video3_title
              video3
            }
            body
          }
        }
      }
    }
  `);

  const {
    title,
    subtitle,
    video1_title,
    video1,
    video2_title,
    video2,
    video3_title,
    video3,
  } = data.allMdx.edges[0].node.frontmatter;
  const { body } = data.allMdx.edges[0].node;

  const videos = [
    { title: video1_title, src: video1 },
    { title: video2_title, src: video2 },
    { title: video3_title, src: video3 },
  ];
  const contactPageRouteObject = siteRoutes.filter(
    (route) => route.name === "צור קשר"
  )[0];

  let contactPageRoute = "/"; // home page as default value
  if (contactPageRouteObject) contactPageRoute = contactPageRouteObject.href;

  return (
    <Page>
      <SEO />
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main>
        <div className="mr-5 md:mr-20">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <div className="text-center">
          <Link to={contactPageRoute}>
            <div className="inline-block rounded-full text-2xl text-center py-1 px-3 border-2 border-black bg-red-link text-white">
              מעניין אתכם? צרו איתנו קשר
            </div>
          </Link>
        </div>
        <div className="pb-10">
          {videos.map(({ title, src }) =>
            src ? (
              <div key={title}>
                {title ? (
                  <TextTitle title={title} className="text-center py-10" />
                ) : null}
                <video className="m-auto w-2/3 h-2/3 " controls>
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            ) : null
          )}
        </div>
      </Page.Main>
    </Page>
  );
}
