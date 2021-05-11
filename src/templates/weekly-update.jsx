import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

function WeeklyUpdate({ data }) {
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`העדכון השבועי | ${config.siteTitle}`} />
      <SEO />
      <PostListing postEdges={postEdges} />
    </Layout>
  );
}

export default WeeklyUpdate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LandingQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title

            date
          }
          html
        }
      }
    }
  }
`;
