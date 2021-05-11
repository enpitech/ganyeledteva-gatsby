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
          
          <Row height='h-60'>
            <div className='w-11/12 flex'>
            <FirstPost firstPost={firstPost}/>
            <div className="hidden nonmob:block w-1/3">
            {/* <div className="hidden nonmob:block w-1/2 p-2 mr-5"> */}
              <img className="h-full" src={"/logos/logo.png"} alt="Logo"/>
            </div>
            </div>
          </Row>

          {/* previous post header*/}
          <Row height='h-10'>
            <div className="w-full nonmob:w-1/2 border-r-4 border-purpleBorder">
            <h2 className="pr-2 my-2">עדכונים קודמים</h2>
            </div>
            <div className="hidden nonmob:block w-1/12"></div>
          </Row>

              {/* previous posts grid */}
          <Row>
          <div className="flex-col nonmob:grid grid-cols-4 gap-10 w-11/12">
              {postList.map((post,indx) => (
                indx < 8 && //render only 8 items
                  <PostItem date={post.date} title={post.title} link={post.path}/>
                ))}
            </div>
          <div className="hidden nonmob:block w-1/12"></div>
          </Row>
        </Page.Main>
      </Page>
      {/* <PostListing postEdges={postEdges} /> */}
    </Layout>
  );
}

export default WeeklyUpdate;

const PostItem = ({date,title,link}) => {
  return(
      <div className="border-2 mb-5 nonmob:m-5 h-80 float-right">
        <p className='h-10 p-4'>{date}</p>
        <h1 className='pb-10 p-4 text-2xl font-bold mb-10 h-40'>{title}</h1>
        <div className="p-4">
        <Link className="rounded-full py-2 px-4 border-2 border-black bg-redLink text-white " to={link}>המשך קריאה ></Link>
        </div>
    </div>
  )
}

const Row = ({children,height}) => {
  return(
    <div className={`flex pr-4 justify-start ${height} mt-10 mb-20`}>
      <div className="hidden nonmob:block w-1/12"></div>
      {children}
    </div>
  )
}

const FirstPost = ({firstPost}) => {
  return(
    <div className="w-full nonmob:w-2/3 pr-4 border-r-4 border-purpleBorder h-full">
      <div className="pr-5">
        <p className="mb-4">{firstPost.date}</p>
        <h1 className='text-4xl mb-8'>{firstPost.title}</h1>
        <Link className="mb-10 rounded-full py-2 px-4 border-2 border-black bg-redLink text-white " to={firstPost.path}>המשך קריאה ></Link>
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
