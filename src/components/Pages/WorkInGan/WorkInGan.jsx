import React, { useState, useLayoutEffect, useRef } from 'react';
import Page from '~src/components/Page/Page';
import PageHeader from '~src/components/Page/PageHeader';
import SEO from '~src/components/SEO';
import { useStaticQuery, graphql, Link } from 'gatsby';
import TextTitle from '~src/components/TextTitle';
import { siteRoutes } from '../../../../data/SiteConfig';
import StickyFooter from '../../StickyFooter';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import TadmitVideo from '../../TadmitVideo';

export default function WorkInGan() {
  const data = useStaticQuery(graphql`
    query workInGanAndteamImagesQuery {
      workInGanMdx: allMdx(filter: { fields: { dir: { eq: "work-in-gan" } } }) {
        edges {
          node {
            fields {
              dir
            }
            frontmatter {
              title
              subtitle
              tadmitVideo
              tadmitVideoTitle
              teamGalleryTitle
              teamList {
                img
                title
                firstName
                lastName
                index
                description
                role
              }
            }
          }
        }
      }
    }
  `);

  const [showStickyFooter, setShowStickyFooter] = useState(false);
  const workInGanTeamTitle = useRef(null);
  useLayoutEffect(() => {
    document.addEventListener('scroll', function (e) {
      if (workInGanTeamTitle.current === null) {
        return;
      }

      const workInGanTeamTitleOffset = workInGanTeamTitle.current.offsetTop;
      const displayPosition = workInGanTeamTitleOffset / 1.5;

      if (!showStickyFooter && window.scrollY >= displayPosition) {
        setShowStickyFooter(true);
      } else if (showStickyFooter && window.scrollY < displayPosition) {
        setShowStickyFooter(false);
      }
    });
  }, [workInGanTeamTitle]);

  const workInGanMdxData = data.workInGanMdx.edges[0].node;
  const {
    title,
    subtitle,
    tadmitVideo,
    tadmitVideoTitle,
    teamGalleryTitle,
    teamList,
  } = workInGanMdxData.frontmatter;

  teamList.sort((a, b) => (a.index > b.index ? 1 : b.index > a.index ? -1 : 0));

  const currentPageRouteObject = siteRoutes.filter(
    (route) => route.href === `/${workInGanMdxData.fields.dir}`
  )[0];

  const currentPageTitle = currentPageRouteObject?.name || 'לעבוד בגן';

  const pageSEOData = {
    title: currentPageTitle,
    description: undefined,
    image: undefined,
    pagePath: workInGanMdxData.fields.dir,
  };

  return (
    <Page>
      <SEO pageSEOData={pageSEOData} />
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-orange-work-in-gan-page-header"
          backgroundPatternClass="bg-patt1"
          textWhite
        />
      </Page.Header>
      <Page.Main>
        {/* <div className="text-center my-8">
          <h1 className="text-4xl font-bold">בא לכם.ן להצטרף אלינו? </h1>
          <Link to="/contact">
            <div className="inline-block my-4 px-10 py-1 text-xl rounded-full text-center border-2 border-black bg-orange-work-in-gan-page-header hover:bg-red-link text-white">
              השאירו פרטים ונחזור אליכן :){" "}
            </div>
          </Link>
        </div> */}
        {tadmitVideo ? (
          <div className="mb-16">
            <TadmitVideo
              tadmitVideo={tadmitVideo}
              className="mt-10 sm:mt-0 sm:h-128 sm:w-screen "
              autoplay
              mute
            />
          </div>
        ) : null}
        <div className="m-auto pb-20 w-5/6" ref={workInGanTeamTitle}>
          <TextTitle
            title={teamGalleryTitle || 'המחנכות מספרות על העבודה בגן'}
            className="text-center py-10"
          />
          <TeamGallery teamList={teamList} />{' '}
        </div>
        {showStickyFooter ? (
          <StickyFooter
            text="בא לכם לעבוד איתנו? 👈"
            mobileText="בא לכם לעבוד איתנו?"
            actionText="צרו קשר"
            actionLink="/contact"
          />
        ) : null}
      </Page.Main>
    </Page>
  );
}

const TeamGallery = ({ teamList }) => {
  return (
    <ul
      role="list"
      className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0"
    >
      {teamList.map((employee, index) => (
        <li key={employee.firstName + index} className="sm:py-8">
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-0 sm:space-y-0 items-center ">
            <div className="aspect-w-3 aspect-h-2  sm:aspect-h-4 ">
              <img
                className="object-cover h-80 shadow-lg rounded-lg"
                src={employee.img}
                alt={employee.title}
              />
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold leading-6 font-medium space-y-1">
                <h3>
                  {employee.firstName} {employee.lastName}
                  <p className="text-indigo-600 text-xl my-1">
                    {employee.role}
                  </p>
                </h3>
              </div>
              <div className="text-lg">
                <p>{employee.description}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
