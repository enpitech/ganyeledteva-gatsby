import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import UserInfo from '../components/UserInfo/UserInfo';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import Footer from '../components/Footer/Footer';
import config from '../../data/SiteConfig';
// import './post.css';
import PageHeader from '../components/Page/PageHeader';
import Page from '../components/Page/Page';
import moment from 'moment'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

// This should be the weekly-update post page
export default function PostTemplate({ data, pageContext }) {
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
        {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
        <Page>
          <PageHeader 
            title={post.title} 
            subtitle={moment(post.date).format("DD/MM/YYYY")}
            backgroundColorClass="bg-gradient-to-r from-yellow-200 to-green-300"
            backgroundPatternClass="bg-patt2"
          />
          <Page.Main>
            <div className="flex justify-between">
              <div className="hidden nonmob:block w-1/5"></div>
              <div className="w-4/5">
                <MDXProvider components={mdStyle}>
              {/* eslint-disable-next-line react/no-danger */}
              {/* <div dangerouslySetInnerHTML={{ __html: postNode.html }} /> */}
              <MDXRenderer>{postNode.body}</MDXRenderer>
              </MDXProvider>
              </div>
              <div className="hidden nonmob:block w-1/5"></div>
          </div>
          
        </Page.Main>
      </Page>
        <div>
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <UserInfo config={config} />
          {/* <Disqus postNode={postNode} /> */}
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

const h1Style = props => <h1 {...props} className="border-r-4 border-purpleBorder mt-10 mb-5 pr-2"/>
const h2Style = props => <h2 {...props} className="border-r-4 border-purpleBorder mt-10 mb-5 pr-2 text-2xl font-normal"/>
const mdStyle = {
  h1: h1Style,
  h2: h2Style,
  p: props => <p {...props} className="mb-3 text-lg"/>,
  strong: props => <strong {...props} className="mt-8 text-lg inline-block"/>,
  ul : props => <ul {...props} className="list-disc list-inside" /> 
  // li : props => <li {...props} className="list-disc" /> 
  
}
/** 
p	Paragraph	
h1	Heading 1	#
const h1Style = props => <h1 {...props} className="border-r-4 border-purpleBorder mt-10 mb-5 pr-2 text-2xl font-normal"/>
h2	Heading 2	##
const h2Style = props => <h2 {...props} className="border-r-4 border-purpleBorder mt-10 mb-5 pr-2 text-2xl font-normal"/>
h3	Heading 3	###
const h3Style = props => <h3 {...props} className="border-r-4 border-purpleBorder mt-10 mb-5 pr-2 text-2xl font-normal"/>
h4	Heading 4	####
const h4Style = props => <h4 {...props} className="border-r-4 border-purpleBorder mt-10 mb-5 pr-2 text-2xl font-normal"/>
h5	Heading 5	#####
const h5Style = props => <h5 {...props} className="border-r-4 border-purpleBorder mt-10 mb-5 pr-2 text-2xl font-normal"/>
h6	Heading 6	######
const h6Style = props => <h6 {...props} className=""/>
thematicBreak	Thematic break	***
const thematicBreak = props => <hr {...props} className=""/>
blockquote	Blockquote	>
const blockQuote = props => <blockquote {...props} className=""/>
ul	List	-
const list = props => <ul {...props} className="list-disc" /> 
ol	Ordered list	1.
const list = props => <ol {...props} className="list-disc" /> 
li	List item	
table	Table	`---
tr	Table row	`This
td/th	Table cell	
pre	Pre	```js console.log()```
code	Code	`console.log()`
em	Emphasis	_emphasis_
strong	Strong	**strong**
const Strong = props => <strong {...props} className=""/>
delete	Delete	~~strikethrough~~
code	InlineCode	`console.log()`
const InlineCode = props => <code {...props} className=""/>
hr	Break	---
a	Link	https://mdxjs.com or [MDX](https://mdxjs.com)
img	Image	![alt](https://mdx-logo.now.sh)
*/