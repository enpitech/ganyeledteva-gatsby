import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import HomeHeader from "./HomeHeader";
import Page from "../../Page/Page";
import SectionCard from "../../SectionCard";
import TextTitle from "../../TextTitle";
import SEO from "../../SEO";
import TeamGrid from "../../TeamGrid";
import Carousel from "~src/components/Carousel";
import tadmitVideo from "~static/assets/vids/dummyvid.mp4";

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
            }
          }
        }
      }
    }
  `);

  const pageNode = data.allMdx.edges[0].node;
  const { frontmatter } = pageNode;
  const { stories, us_on_media: usOnMediaArticles } = frontmatter;

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
        <TadmitVideo />
        <div className="mt-40 ">
          <TextTitle title="אנחנו בתקשורת" className="text-center" />
          <div className=" ">
            <Carousel time={8000}>
              {usOnMediaArticles.map(
                ({ title, img, link_to_article: linkToArticle }) => (
                  <Article
                    key={title}
                    title={title}
                    img={img}
                    linkToArticle={linkToArticle}
                  />
                )
              )}
            </Carousel>
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

const Article = ({ title, img, linkToArticle, className }) => {
  return (
    <div className={`text-center text-2xl ${className}`}>
      <a href={linkToArticle} target="_blank">
        <div className="mb-2">{title}</div>
        <img className="md:h-96 m-auto" src={img} />
      </a>
    </div>
  );
};

const TadmitVideo = () => {
  return (
    <div>
      <video className="m-auto mt-40 w-2/3 h-2/3 " autoPlay loop muted>
        <source src={tadmitVideo} type="video/mp4" />
      </video>
    </div>
  );
};
