import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../../../layout";
import SEO from "../../SEO";
import config from "../../../../data/SiteConfig";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import { formatDate } from "../../../utils";
import Logo from "../../Logo/Logo";

function WeeklyUpdate({ data }) {
  const postEdges = data.allMdx.edges;
  const postList = [];
  postEdges.forEach((postEdge) => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      dir: postEdge.node.fields.dir,
    });
  });

  const [firstPost, ...restPostList] = postList;
  const pageTitle = "העדכון השבועי";
  const pagePath = config.siteRoutes.filter(
    (routeObject) => routeObject.name === pageTitle
  )[0].href;

  const pageSEOData = {
    title: pageTitle,
    description: undefined,
    image: undefined,
    pagePath,
  };

  return (
    <Layout>
      <Helmet title={`${pageTitle} | ${config.siteTitle}`} />
      <SEO pageSEOData={pageSEOData} />
      <Page>
        <PageHeader
          title="העדכון השבועי"
          subtitle="מתוך הכרה בחשיבות הקשר שבין המשולש- ילד/ה-בית-גן נשלח אליכם ההורים בכל סוף שבוע עדכון שבועי ובו אנו משתפות אתכם בחוויות המשותפות שלנו ממהלך השבוע, מעדכנות בפרטים חשובים ומאפשרות גם לכם להיות חלק מהעשייה בגן."
          backgroundColorClass="bg-purple-header"
          backgroundPatternClass="bg-patt3"
          textWhite
        ></PageHeader>
        <Page.Main>
          <div className="md:grid grid-cols-9 gap-2 mr-3">
            <div className="col-span-9 h-6" />
            <div className="md:col-span-5 lg:col-span-4 lg:col-start-2">
              <FirstPost firstPost={firstPost} />
            </div>
            <div className="hidden md:block col-span-4 h-60">
              <Logo className="h-5/6 mx-auto my-5" />
            </div>
            <div className="col-span-9 h-24" />
            <div className="md:col-span-full lg:col-span-6 lg:col-start-2 border-r-4 border-purple-border mb-4">
              <h2 className="pr-5 my-2 ">עדכונים קודמים</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-2 md:col-span-full">
              <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
                {restPostList.map(
                  (post, index) =>
                    index < 8 && (
                      <PostItem
                        date={post.date}
                        title={post.title}
                        fullPostUrl={post.path}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </Page.Main>
      </Page>
    </Layout>
  );
}

export default WeeklyUpdate;

const GotoPostButton = (props) => (
  <div
    {...props}
    className={`inline-block rounded-full text-base text-center py-1 px-3 border-2 border-black bg-red-link text-white ${props.className}`}
  >
    המשך קריאה >
  </div>
);

const PostItem = ({ date, title, fullPostUrl }) => {
  return (
    <div className="w-2/3 md:w-11/12 border h-80 float-right">
      <div className="h-full border-transparent border-r-4 hover:border-purple-border">
        <Link to={fullPostUrl}>
          <div className="pr-4">
            <p className="h-10 pt-3">{formatDate(date)}</p>
            <h1 className="pb-10 text-3xl font-bold mb-10 h-40 pl-2">
              {title}
            </h1>
            <GotoPostButton />
          </div>
        </Link>
      </div>
    </div>
  );
};

const FirstPost = ({ firstPost }) => {
  return (
    <div className="border-r-4 border-purple-border py-5 h-full">
      <Link to={firstPost.path}>
        <div className="px-5">
          <p className="mb-4 pt-2">{formatDate(firstPost.date)}</p>
          <h1 className="text-5xl mb-8 font-bold">{firstPost.title}</h1>
          <GotoPostButton className="my-5" />
        </div>
      </Link>
    </div>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LandingQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { dir: { eq: "weekly-update" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
            dir
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date
          }
          body
        }
      }
    }
  }
`;
