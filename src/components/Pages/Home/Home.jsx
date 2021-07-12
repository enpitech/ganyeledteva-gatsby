import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import HomeHeader from "./HomeHeader";
import Page from "../../Page/Page";
import SectionCard from "../../SectionCard";
import TextTitle from "../../TextTitle";
import SEO from "../../SEO";
import TeamGrid from "../../TeamGrid";
import Carousel from "~src/components/Carousel";

function Home() {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      allMdx(filter: { fields: { dir: { eq: "home" } } }) {
        edges {
          node {
            fields {
              filename
            }
            frontmatter {
              us_on_media {
                title
                img
                link_to_article
              }
              stories {
                title
                subtitle
                link
                img
                url
              }
              tadmit_video
              tadmit_video_title
            }
          }
        }
      }
    }
  `);

  const pageNode = data.allMdx.edges[0].node;
  const { frontmatter } = pageNode;
  const {
    stories,
    us_on_media: usOnMediaArticles,
    tadmit_video: tadmitVideo,
    tadmit_video_title: tadmitVideoTitle,
  } = frontmatter;

  return (
    <Page
      style={{
        background: "#fff url('img/backgrounds/back.png')",
        backgroundSize: "cover",
      }}
    >
      <SEO />
      <Page.Header>
        <HomeHeader />
      </Page.Header>
      <Page.Main className="md:flex md:flex-col justify-center items-center">
        <div className="md:w-9/12">
          {stories.map((story, index) => {
            const { title, subtitle, link, img, url } = story;
            return (
              <SectionCard
                className={`flex flex-col ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } justify-between mt-20`}
                key={title}
                title={title}
                subtitle={subtitle}
                path={url}
                link={link}
                img={img}
              />
            );
          })}
        </div>
        <TeamGrid />
        <TadmitVideo
          tadmitVideoTitle={tadmitVideoTitle}
          tadmitVideo={tadmitVideo}
        />
        <div className="mt-40 ">
          <TextTitle title="אנחנו בתקשורת" className="text-center" />
          <div>
            {/* <Carousel time={8000}> */}
            {/* <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerclassName="container-with-dots"
              dotListclassName=""
              draggable
              focusOnSelect={false}
              infinite
              itemclassName=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderclassName=""
              slidesToSlide={1}
              swipeable
            >
              {usOnMediaArticles.map(
                ({ img, link_to_article: linkToArticle }) => (
                  <Article
                    key={linkToArticle}
                    img={img}
                    linkToArticle={linkToArticle}
                  />
                )
              )}
            </Carousel> */}
            {/* <div className="w-full carousel">
              <div id="slide1" className="relative w-full pt-20 carousel-item">
                <img
                  src="https://picsum.photos/id/500/800/300"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href="/components/carousel#slide4"
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href="/components/carousel#slide2"
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide2" className="relative w-full pt-20 carousel-item">
                <img
                  src="https://picsum.photos/id/501/800/300"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href="/components/carousel#slide1"
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href="/components/carousel#slide3"
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide3" className="relative w-full pt-20 carousel-item">
                <img
                  src="https://picsum.photos/id/502/800/300"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href="/components/carousel#slide2"
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href="/components/carousel#slide4"
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide4" className="relative w-full pt-20 carousel-item">
                <img
                  src="https://picsum.photos/id/503/800/300"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href="/components/carousel#slide3"
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href="/components/carousel#slide1"
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
        <div className="md:w-9/12 mt-40 mb-20">
          <TextTitle className="text-center" title='מה הלו"ז' />
          <iframe
            title="calendar"
            src="https://calendar.google.com/calendar/embed?showTitle=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&height=600&wkst=1&bgcolor=%23FFFFFF&src=ganyeledteva%40gmail.com&color=%23b90e28&ctz=Asia%2FJerusalem"
            width="100%;"
            height="600"
            scrolling="no"
          />
        </div>
      </Page.Main>
    </Page>
  );
}

export default Home;

const Article = ({ img, linkToArticle, className }) => {
  return (
    <div className={`text-center text-2xl ${className}`}>
      <a href={linkToArticle} target="_blank">
        <img className="md:h-96 m-auto" src={img} />
      </a>
    </div>
  );
};

const TadmitVideo = ({ tadmitVideo, tadmitVideoTitle }) => {
  return tadmitVideo ? (
    <div className="mt-40">
      {/* {tadmitVideoTitle ? (
        <TextTitle className="text-center" title={tadmitVideoTitle} />
      ) : null} */}
      <video className="m-auto mt-10" autoPlay loop muted>
        <source src={tadmitVideo} type="video/mp4" />
      </video>
    </div>
  ) : null;
};
