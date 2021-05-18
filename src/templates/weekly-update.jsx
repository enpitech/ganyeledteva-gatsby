import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import Page from '../components/Page/Page';
import PageHeader from '../components/Page/PageHeader';
import moment from 'moment'

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

  const [firstPost,...restPostList] = postList

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
          <div className='max-w-screen-lg m-auto'>

            {/* big first post */}
            <Row height='h-60'>
              <div className='w-11/12 flex'>
                <FirstPost firstPost={firstPost} />
                <div className="hidden nonmob:block w-1/3">
                  <img className="h-full" src={"/logos/logo.png"} alt="Logo" />
                </div>
              </div>
            </Row>

            {/* previous post header*/}
            <Row height='h-10' mb='mb-5' withLeftGap>
              <div className="w-full nonmob:w-1/2 border-r-4 border-purpleBorder">
                <h2 className="pr-2 my-2">עדכונים קודמים</h2>
              </div>
            </Row>

            {/* previous posts grid */}
            <div className="pb-6">
              <Row withLeftGap>
                <div className="flex-col nonmob:grid grid-cols-4 gap-8 w-11/12">
                  {restPostList.map((post, indx) => (
                    indx < 8 && //render only 8 items
                    <PostItem date={post.date} title={post.title} link={post.path} />
                  ))}
                </div>
              </Row>
            </div>
          </div>
        </Page.Main>
      </Page>
    </Layout>
  );
}

export default WeeklyUpdate;

const PostItem = ({ date, title, link }) => {
  return (
    // <div className="nonmob:w-9/10 box-border border-2 mb-5 h-80 float-right hover:border-purpleBorder">
    <div className="nonmob:w-full border h-80 float-right">
      <div className="h-full border-transparent border-r-4 hover:border-purpleBorder">
        <Link to={link}>
          <p className='h-10 p-4'>{moment(date).format("DD/MM/YYYY")}</p>
          <h1 className='pb-10 p-4 text-3xl mb-10 h-40'>{title}</h1>
          <div className="p-4">
            <div className="w-36 rounded-full py-1 px-4 border-2 border-black bg-redLink text-white " >המשך קריאה ></div>
          </div>
        </Link>
      </div>
    </div>
  )
}

const Row = ({ children, height, mb, withLeftGap }) => {
  return (
    <div className="mr-10 nonmob:mr-0">
      <div className={`flex justify-start ${height} mt-10 ${mb || 'mb-20'}`}>
        <div className="hidden nonmob:block w-1/12"></div>
        {children}
        {withLeftGap &&
          <div className="hidden nonmob:block w-1/12"></div>
        }
      </div>
    </div>
  )
}

const FirstPost = ({ firstPost }) => {
  return (
    <div className="w-full nonmob:w-2/3 pr-4 border-r-4 border-purpleBorder h-full">
      <Link to={firstPost.path}>
        <div className="pr-5">
          <p className="mb-4">{moment(firstPost.date).format("DD/MM/YYYY")}</p>
          <h1 className='text-5xl mb-8'>{firstPost.title}</h1>
          <div className="w-36 rounded-full py-1 px-4 border-2 border-black bg-redLink text-white " >המשך קריאה ></div>
        </div>
      </Link>
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
