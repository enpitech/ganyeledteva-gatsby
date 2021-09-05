import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import HomeHeader from "./HomeHeader";
import Page from "../../Page/Page";
import SectionCard from "../../SectionCard";
import TextTitle from "../../TextTitle";
import SEO from "../../SEO";
import TeamGrid from "../../TeamGrid";
import arrowRightIcon from "~static/img/pics/icons/arrow_right.svg";
import arrowLeftIcon from "~static/img/pics/icons/arrow_left.svg";
import "./Home.css";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
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
  } = frontmatter;

  const screenWidth = window.innerWidth;
  console.log({ screenWidth });
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
        <TadmitVideo tadmitVideo={tadmitVideo} />
        <div className="mt-20 md:mt-40">
          <TextTitle title="אנחנו בתקשורת" className="text-center" />
          <CarouselProvider
            naturalSlideWidth={500}
            naturalSlideHeight={500}
            totalSlides={usOnMediaArticles.length}
            infinite
            isPlaying
            visibleSlides={screenWidth < 768 ? 1 : 3}
            className="w-screen"
            interval={8000}
          >
            <div className="relative">
              <Slider>
                {usOnMediaArticles.map(
                  ({ img, link_to_article: linkToArticle }, index) => (
                    <Slide index={index}>
                      <Article
                        key={linkToArticle}
                        img={img}
                        linkToArticle={linkToArticle}
                      />
                    </Slide>
                  )
                )}
              </Slider>

              <ButtonBack className="absolute left-0 top-1/3 h-1/3 focus:outline-none">
                <img className="ml-6 w-8 md:w-20 m-auto" src={arrowLeftIcon} />
              </ButtonBack>
              <ButtonNext className="absolute top-1/3 h-1/3 focus:outline-none">
                <img className="mr-6 w-8 md:w-20 m-auto" src={arrowRightIcon} />
              </ButtonNext>
            </div>
            <DotGroup className="mt-4 text-center">
              {usOnMediaArticles.map((_, index) => (
                <Dot
                  className={`mx-1 md:mx-5 focus:outline-none rounded-full w-3 h-3 bg-red-link`}
                  slide={index}
                >
                  {/* <div
                    // className={`inline-block rounded-full h-3 w-3`}
                    className={`inline-block rounded-full h-3 w-3 bg-red-link`}
                  ></div> */}
                </Dot>
              ))}
            </DotGroup>
          </CarouselProvider>
        </div>
        <div className="md:w-9/12 mt-20 md:mt-40 mb-20">
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
    <div className={`h-full text-center text-2xl ${className}`}>
      <a href={linkToArticle} target="_blank">
        <img className="rounded h-96 m-auto" src={img} />
      </a>
    </div>
  );
};

const TadmitVideo = ({ tadmitVideo }) => {
  return tadmitVideo ? (
    <div className="mt-40">
      <video className="m-auto mt-10" autoPlay loop muted>
        <source src={tadmitVideo} type="video/mp4" />
      </video>
    </div>
  ) : null;
};
