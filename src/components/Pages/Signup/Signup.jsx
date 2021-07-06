import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import SignupForm from "./SignupForm";
import SEO from "../../SEO/SEO";
import { siteRoutes } from "../../../../data/SiteConfig";

export default function Signup() {
  const data = useStaticQuery(graphql`
    query SignupQuery {
      allMdx(filter: { fields: { dir: { eq: "signup" } } }) {
        edges {
          node {
            body
            fields {
              dir
            }
            frontmatter {
              title
              subtitle
            }
          }
        }
      }
    }
  `);

  const pageNode = data.allMdx.edges[0].node;
  const { frontmatter, body } = pageNode;
  const { title, subtitle } = frontmatter;

  const currentPageRouteObject = siteRoutes.filter(
    (route) => route.href === `/${pageNode.fields.dir}`
  )[0];

  const currentPageTitle = currentPageRouteObject?.name || "רישום לגן";

  const pageSEOData = {
    title: currentPageTitle,
    description: undefined, // description to be added later by Tzachi
    pagePath: pageNode.fields.dir,
  };

  return (
    <Page>
      <Page.Header>
        <SEO pageSEOData={pageSEOData} />
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <MDXRenderer>{body}</MDXRenderer>
        <SignupForm />
      </Page.Main>
    </Page>
  );
}
