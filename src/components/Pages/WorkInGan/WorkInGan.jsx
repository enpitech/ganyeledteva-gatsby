import React, { useState, useLayoutEffect, useRef } from 'react';
import Page from '~src/components/Page/Page';
import PageHeader from '~src/components/Page/PageHeader';
import SEO from '~src/components/SEO';
import { useStaticQuery, graphql } from 'gatsby';
import TextTitle from '~src/components/TextTitle';
import { siteRoutes } from '../../../../data/SiteConfig';
import StickyFooter from '../../StickyFooter';

export default function WorkInGan() {
  const data = useStaticQuery(graphql`
    query workInGanAndteamImagesQuery {
      teamMdx: allMdx(filter: { fields: { dir: { eq: "team" } } }) {
        edges {
          node {
            frontmatter {
              img
              title
            }
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
    document.addEventListener('scroll', function (e) {
      if (workInGanTeamTitle.current === null) {
        return;
      }

      const workInGanTeamTitleOffset = workInGanTeamTitle.current.offsetTop;
      const displayPosition = workInGanTeamTitleOffset / 3;

      if (!showStickyFooter && window.scrollY >= displayPosition) {
        setShowStickyFooter(true);
      } else if (showStickyFooter && window.scrollY < 100) {
        setShowStickyFooter(false);
      }
    });
  }, [workInGanTeamTitle]);

  const teamImagesEdges = data.teamMdx.edges;
  let teamImages = teamImagesEdges.map((imgEdge) => ({
    src: imgEdge.node.frontmatter.img,
    alt: imgEdge.node.frontmatter.title,
  }));

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
        />
      </Page.Header>
      <Page.Main>
        {tadmitVideo ? (
          <div className="mb-16">
            <video className="w-max" controls autoPlay muted>
              <source src={tadmitVideo} type="video/mp4" />
            </video>
          </div>
        ) : null}
        <div className="m-auto pb-20 w-5/6" ref={workInGanTeamTitle}>
          <TextTitle
            title={teamGalleryTitle || 'המחנכות מספרות על העבודה בגן'}
            className="text-center py-10"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
            {teamImages.map((img) => (
              <img key={img.src} src={img.src} alt={img.alt} />
            ))}
          </div>
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
