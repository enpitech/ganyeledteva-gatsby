import React, { useState, useLayoutEffect, useRef } from "react";
import Page from "~src/components/Page/Page";
import PageHeader from "~src/components/Page/PageHeader";
import SEO from "~src/components/SEO";
import { useStaticQuery, graphql } from "gatsby";
import TextTitle from "~src/components/TextTitle";
import { siteRoutes } from "../../../../data/SiteConfig";
import StickyFooter from "../../StickyFooter";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TadmitVideo from "../../TadmitVideo";

export default function WorkInGan() {
  const data = useStaticQuery(graphql`
    query workInGanAndteamImagesQuery {
      teamMdx: allMdx(filter: { fields: { dir: { eq: "team" } } }) {
        edges {
          node {
            frontmatter {
              img
              title
              firstname
              lastname
              index
            }
            body
          }
        }
      }
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
            }
          }
        }
      }
    }
  `);

  const [showStickyFooter, setShowStickyFooter] = useState(false);
  const workInGanTeamTitle = useRef(null);
  useLayoutEffect(() => {
    document.addEventListener("scroll", function (e) {
      if (workInGanTeamTitle.current === null) {
        return;
      }

      const workInGanTeamTitleOffset = workInGanTeamTitle.current.offsetTop;
      const displayPosition = workInGanTeamTitleOffset / 3;

      if (!showStickyFooter && window.scrollY >= displayPosition) {
        setShowStickyFooter(true);
      } else if (showStickyFooter && window.scrollY < 150) {
        setShowStickyFooter(false);
      }
    });
  }, [workInGanTeamTitle]);

  const teamDataEdges = data.teamMdx.edges;
  let teamData = teamDataEdges.map((employee) => ({
    imageSrc: employee.node.frontmatter.img,
    imageAlt: employee.node.frontmatter.title,
    firstName: employee.node.frontmatter.firstname,
    lastName: employee.node.frontmatter.lastname,
    descriptionAsMD: employee.node.body,
    index: employee.node.frontmatter.index,
  }));

  teamData.sort((a, b) => (a.index > b.index ? 1 : b.index > a.index ? -1 : 0));

  const workInGanMdxData = data.workInGanMdx.edges[0].node;
  const {
    title,
    subtitle,
    tadmitVideo,
    tadmitVideoTitle,
    teamGalleryTitle,
  } = workInGanMdxData.frontmatter;

  const currentPageRouteObject = siteRoutes.filter(
    (route) => route.href === `/${workInGanMdxData.fields.dir}`
  )[0];

  const currentPageTitle = currentPageRouteObject?.name || "לעבוד בגן";

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
        {tadmitVideo ? (
          <TadmitVideo tadmitVideo={tadmitVideo} />
        ) : // <div className="mb-16">
        //   <video className="w-full" controls autoPlay muted>
        //     <source src={tadmitVideo} type="video/mp4" />
        //   </video>
        // </div>
        null}
        <div className="m-auto pb-20 w-5/6" ref={workInGanTeamTitle}>
          <TextTitle
            title={teamGalleryTitle || "המחנכות מספרות על העבודה בגן"}
            className="text-center py-10"
          />
          <TeamGallery teamData={teamData} />{" "}
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

const TeamGallery = ({ teamData }) => {
  return (
    <ul
      role="list"
      className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0"
    >
      {teamData.map((employee) => (
        <li key={employee.name} className="sm:py-8">
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 items-center ">
            <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4 ">
              <img
                className="object-cover h-80 w-96 shadow-lg rounded-lg"
                src={employee.imageSrc}
                alt={employee.imageAlt}
              />
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold leading-6 font-medium space-y-1">
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>
              </div>
              <div className="text-lg">
                <MDXRenderer>{employee.descriptionAsMD}</MDXRenderer>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
