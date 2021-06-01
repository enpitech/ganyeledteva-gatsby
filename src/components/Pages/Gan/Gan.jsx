import React from "react";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../../../layout";
import UserInfo from "../../../components/UserInfo/UserInfo";
import Disqus from "../../../components/Disqus/Disqus";
import PostTags from "../../../components/PostTags/PostTags";
import SocialLinks from "../../../components/SocialLinks/SocialLinks";
import SEO from "../../../components/SEO/SEO";
import config from "../../../../data/SiteConfig";

function Gan({ data, pageContext }) {
  const postEdges = data.allMdx.edges;
  const postList = [];
  postEdges.forEach((postEdge) => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      subtitle: postEdge.node.frontmatter.subtitle,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      dir: postEdge.node.fields.dir,
      body: postEdge.node.body,
      img: postEdge.node.frontmatter.img,
      link: postEdge.node.frontmatter.link,
    });
  });
  // const { slug } = pageContext;
  // const postNode = data.allMdx;
  // const post = postNode.frontmatter;
  // if (!post.id) {
  //   post.id = slug;
  // }

  const headerMdPost = postList.filter(
    (post) => post.title === "גן ילדי הטבע הדמוקרטי"
  )[0];

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${headerMdPost.title} | ${config.siteTitle}`}</title>
        </Helmet>
        {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
        <Page>
          <Page.Header>
            <PageHeader
              title={headerMdPost.title}
              subtitle={headerMdPost.subtitle}
              backgroundColorClass="bg-gradient-to-r from-blue-header1Gan to-blue-header2Gan"
              backgroundPatternClass="bg-patt1"
            />
          </Page.Header>
          <Page.Main className="">
            <div className="md:w-9/12 m-auto">
              {postList.map(
                (post, index) =>
                  post.title !== "גן ילדי הטבע הדמוקרטי" && (
                    <div key={index} className="mt-10 mb-16 md:mb-40">
                      <Post post={post} />
                    </div>
                  )
              )}
            </div>
          </Page.Main>
        </Page>
        <div>
          <div className="post-meta">
            {/* <PostTags tags={post.tags} /> */}
            {/* <SocialLinks postPath={slug} postNode={postNode} /> */}
          </div>
          <UserInfo config={config} />
          {/* <Disqus postNode={postNode} /> */}
        </div>
      </div>
    </Layout>
  );
}

export default Gan;

const Post = ({ post }) => {
  return (
    <div className="flex md:flex-row flex-col justify-between">
      <div className="flex flex-col md:w-2/5">
        <h1 className="text-3xl font-bold mb-2"> {post.title} </h1>
        <p>{post.subtitle}</p>
        <Link to={post.path}>
          <div className="inline-block my-4 px-2 py-1 rounded-full  text-center border-2 border-black text-black hover:bg-red-link hover:text-white">
            {post.link}
            {" >"}
          </div>
        </Link>
      </div>
      <div className="md:w-5/12 h-2/6 mt-16 md:mt-0">
        <img
          className=" m-auto lg:mx-5 shadow-democEducImg h-4/5"
          src={post.img}
        />
      </div>
    </div>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query GanPageQuery {
    allMdx(filter: { fields: { dir: { eq: "gan" } } }) {
      edges {
        node {
          fields {
            slug
            date
            dir
          }
          frontmatter {
            title
            date
            img
            subtitle
            link
          }
          body
        }
      }
    }
  }
`;
