import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import PageHeader from "../components/Page/PageHeader";
import Page from "../components/Page/Page";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function GanPostTemplate({ data, pageContext }) {
  const { mdx, allMdx } = data;
  const postTitles = allMdx.edges.map(
    (postEdge) => postEdge.node.frontmatter.title
  );
  const postPaths = allMdx.edges.map((postEdge) => postEdge.node.fields.slug);
  const { slug } = pageContext;
  const postNode = mdx;
  const post = postNode.frontmatter;
  const images = post.images;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Page>
        <Page.Header className="border-b-8 border-yellow-headerBorder">
          <PageHeader
            title={post.title}
            subtitle=""
            backgroundColorClass="bg-gradient-to-r from-yellow-headerGanPost to-green-headerGanPost"
            backgroundPatternClass="bg-patt2"
          />
        </Page.Header>
        <Page.Main className="md:flex justify-center pb-20">
          <div className="md:w-3/7 ml-10">
            <MDXRenderer>{postNode.body}</MDXRenderer>
            <BottomNavMenu
              postTitles={postTitles}
              postPaths={postPaths}
              currPostTitle={post.title}
            />
          </div>
          <div className="md:w-2/7 mt-4">
            {images.map((img, index) => (
              <div
                key={`${(img.src, index)}`}
                className="my-5 lg:mx-5 shadow-democEducImg"
              >
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </Page.Main>
      </Page>
    </Layout>
  );
}

const BottomNavMenu = ({ postTitles, postPaths, currPostTitle }) => {
  const thisPostStyle = "text-purple-lightBorder opacity-40";
  const otherPostStyle = "hover:text-purple-border";
  return (
    <div className="border-t-2 pt-4 mt-6">
      <div className="text-red-link text-3xl">עוד בנושא...</div>
      <div className="text-2xl">
        {postTitles.map((title, index) => {
          if (title !== "גן ילדי הטבע הדמוקרטי") {
            return (
              <div
                key={index}
                className={`my-1 ${
                  title === currPostTitle ? thisPostStyle : otherPostStyle
                }`}
              >
                <Link to={postPaths[index]}>> {title}</Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ganPostBySlugAndGanPostsListQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        images {
          alt
          src
        }
      }
      fields {
        slug
      }
    }
    allMdx(filter: { fields: { dir: { eq: "gan" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
