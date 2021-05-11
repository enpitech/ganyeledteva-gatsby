import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql,Link } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import Page from '../components/Page/Page';
import PageHeader from '../components/Page/PageHeader';

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
      dir: postEdge.node.fields.dir
    });
  });

  let firstPost = postList.pop()

  return (
    <Layout>
      <Helmet title={`העדכון השבועי | ${config.siteTitle}`} />
      <SEO />
      <Page>
        <PageHeader
          title='העדכון השבועי'
          subtitle='מתוך הכרה בחשיבות הקשר שבין המשולש- ילד/ה-בית-גן נשלח אליכם ההורים בכל סוף שבוע עדכון שבועי ובו אנו משתפות אתכם בחוויות המשותפות שלנו ממהלך השבוע, מעדכנות בפרטים חשובים ומאפשרות גם לכם להיות חלק מהעשייה בגן.'
          backgroundColorClass="bg-gradient-to-r from-green-400 to-blue-300"
          backgroundPatternClass="bg-patt3"
        >
        </PageHeader>
        <Page.Main>
          <div className="flex justify-start h-60  mt-10 mb-20">
            <div className="hidden nonmob:block w-2/12"></div>
            <div className="w-full nonmob:w-1/2 pl-5">
              <PostItem date={firstPost.date} title={firstPost.title} link={firstPost.path} first />
            </div>
            <div className="hidden nonmob:block w-1/3 p-2 mr-5">
              <img className="h-full" src={"/logos/logo.png"} alt="Logo"/>
            </div>
          </div>
          <div className="grid grid-cols-4">
            {postList.map((post,indx) => (
              indx < 8 && //render only 8 items
              <div>
                <PostItem date={post.date} title={post.title} link={post.path} first={false}/>
              </div>
              ))}
            </div>
        </Page.Main>
      </Page>
      {/* <PostListing postEdges={postEdges} /> */}
    </Layout>
  );
}

export default WeeklyUpdate;

const PostItem = ({date,title,link,first}) => {
  return(
    <div className="border-r-4 border-purpleBorder h-full flex items-center ">
      <div className="mr-10">
        <p>{date}</p>
        <h1 className={`text-${first? '3xl' : 'xl'} mb-10 `}>{title}</h1>
        <Link className="rounded-full py-2 px-4 border-2 border-black bg-redLink text-white " to={link}>המשך קריאה ></Link>
      </div>
    </div>
  )

}


/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LandingQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC },
                      filter: { fields: { dir: { eq: "weekly-update" }}}) {
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

            date(formatString: "MMMM DD, YYYY")
          }
          body
        }
      }
    }
  }
`;
