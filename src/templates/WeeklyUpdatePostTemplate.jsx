import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import UserInfo from '../components/UserInfo/UserInfo';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import PageHeader from '../components/Page/PageHeader';
import Page from '../components/Page/Page';
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { formatDate } from '../utils';

// This should be the weekly-update post page
export default function WeeklyUpdatePostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.mdx;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Page>
          <PageHeader 
            title={post.title} 
            subtitle={formatDate(post.date)}
            backgroundColorClass="bg-gradient-to-r from-yellow-200 to-green-300"
            backgroundPatternClass="bg-patt2"
          />
          <Page.Main>
            <div className="flex justify-between">
              <div className="hidden md:block w-1/5 RIGHT_GAP"/>
              <div className="md:w-3/5 mb-10 MAIN_CONTENT">
                <MDXProvider components={mdStyle}>
                  <MDXRenderer>{postNode.body}</MDXRenderer>
                </MDXProvider>
              </div>
              <div className="hidden md:block w-1/5 LEFT_GAP"/>
          </div>
          
        </Page.Main>
      </Page>
        <div>
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <UserInfo config={config} />
          <Disqus postNode={postNode} />
        </div>
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      excerpt
      frontmatter {
        title
        date
      }
      fields {
        slug
        date
      }
    }
  }
`;

/**
 * defining the custom styling of md element to html elements 
 */

/* <blockqoute/> element  ref= https://www.coltborg.com/style-a-blockquote-using-tailwind-css/*/
const Blockquote = props =>
 <blockquote {...props} className='p-4 italic border-r-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote'>
    &ldquo;
    {props.children}
</blockquote>

/* main style object, is passed to MDXRenderer  */
const mdStyle = {
  h1: props => <h1 {...props} className="text-4xl"/>,
  h2: props => <h2 {...props} className="border-r-4 border-purple-border mt-12 mb-5 pr-2 text-3xl font-normal"/>,
  p: props => <p {...props} className="mb-3 text-lg"/>,
  strong: props => <strong {...props} className="text-lg inline-block"/>,
  ul : props => <ul {...props} className="list-disc list-outside mb-5 mr-5"/> ,
  ol : props => <ol {...props} className="list-decimal list-outside mb-5 mr-5" /> ,
  li: props => <li {...props} className="text-lg"/>,
  a: props => <a {...props} className="text-blue-500"/>,
  blockquote: Blockquote , 
}
