import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import SEO from "../../SEO";
import { siteRoutes } from "../../../../data/SiteConfig";
import { useStaticQuery, graphql, Link } from "gatsby";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import TextTitle from "../../TextTitle";

export default function Products() {
  const data = useStaticQuery(graphql`
    query productsQuery {
      teamMdx: allMdx(filter: { fields: { dir: { eq: "team" } } }) {
        edges {
          node {
            frontmatter {
              title
              subtitle
            }
            body
          }
        }
      }
    }
  `);

  const title = "המוצרים החינוכיים שלנו";
  const subtitle = "יש לנו ימבה מוצרים מגניבים";
  const body = "וואי כמה מוצרים";
  const contactPageRouteObject = siteRoutes.filter(
    (route) => route.name === "צור קשר"
  )[0];

  let contactPageRoute = "/"; // default value
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
        {/* <MDXRenderer>{body}</MDXRenderer> */}
        <Link to={contactPageRoute}>
          <TextTitle
            className="text-center"
            title="מעניין אתכם? צרו איתנו קשר"
          />
        </Link>
        {/* <Carousel/> */}
        <div>
          {/* {videos.map(({ title, src }) =>
            src ? (
              <div>
                {title ? (
                  <TextTitle title={title} className="text-center py-10" />
                ) : null}
                <video className="m-auto w-2/3 h-2/3 " controls>
                  <source src={tadmitVideo} type="video/mp4" />
                </video>
              </div>
            ) : null
          )} */}
        </div>
      </Page.Main>
    </Page>
  );
}
