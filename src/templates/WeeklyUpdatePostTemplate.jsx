import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import PageHeader from "../components/Page/PageHeader";
import Page from "../components/Page/Page";
import { formatDate } from "../utils";

// This should be the weekly-update post page
export default function WeeklyUpdatePostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.mdx;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  const postSEOData = { postPath: slug, postNode };

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postSEOData={postSEOData} />

      <Page>
        <PageHeader
          title={post.title}
          subtitle={formatDate(post.date)}
          backgroundColorClass="bg-gradient-to-r from-yellow-200 to-green-300"
          backgroundPatternClass="bg-patt2"
        />
        <Page.Main>
          <div className="flex justify-between">
            <Gap />
            <div className="md:w-3/5 mb-10 text-lg">
              <MDXRenderer>{postNode.body}</MDXRenderer>
            </div>
            <Gap />
          </div>
        </Page.Main>
      </Page>
    </Layout>
  );
}

const Gap = () => <div className="hidden md:block w-1/5" />;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query WeeklyUpdatePostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      excerpt
      frontmatter {
        title
        subtitle
        date
        img
      }
      fields {
        slug
        date
      }
    }
  }
`;
