import React, { useState, useLayoutEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import _ from 'lodash';
import { InformationCircleIcon } from '@heroicons/react/outline'
import HomeHeader from './HomeHeader';
import Page from '../../Page/Page';
import SectionCard from '../../SectionCard';
import TextTitle from '../../TextTitle';
import SEO from '../../SEO';
import TeamGrid from '../../TeamGrid';
import './Home.css';
import TadmitVideo from '../../TadmitVideo';
import tailwindConfig from '../../../../tailwind.config';
import { formatScreenSizeStringToNumber } from '../../../utils';

const screensSizes = tailwindConfig.theme.extend.screens;

const BREAK_POINTS = {
  lg: formatScreenSizeStringToNumber(screensSizes.lg),
  md: formatScreenSizeStringToNumber(screensSizes.md),
  sm: formatScreenSizeStringToNumber(screensSizes.sm),
};

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
              tadmit_video_youtube_url
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
    tadmit_video_youtube_url: tadmitVideoYoutubeUrl,
  } = frontmatter;

  const [screenWidth, setScreenWidth] = useState(0);
  const [playTadmitVideo, setPlayTadmitVideo] = useState(false);

  useLayoutEffect(() => {
    setScreenWidth(window.innerWidth);

    const autoplayTadmitVideo = () => {
      const tadmitVideoContainer = document.getElementById(
        'tadmit-video-container'
      );
      if (_.isNil(tadmitVideoContainer)) {
        return;
      }
      // will trigger when your element comes into viewport
      const hT = document.getElementById('tadmit-video-container').offsetTop;
      const hH = document.getElementById('tadmit-video-container').offsetHeight;
      const wH = window.innerWidth;
      const wS = window.scrollY;

      if (!playTadmitVideo && wS > hT + hH - wH) {
        window.removeEventListener('scroll', autoplayTadmitVideo);
        setPlayTadmitVideo(true);
      }
    };

    window.addEventListener('scroll', autoplayTadmitVideo);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:
      screenWidth < BREAK_POINTS.sm ? 1 : screenWidth < BREAK_POINTS.md ? 2 : 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    rtl: true,
    swipeToSlide: true,
  };

  return (
    <Page
      style={{
        background: "#fff url('img/backgrounds/back.png')",
        backgroundSize: 'cover',
      }}
    >
      <SEO />
      <Page.Header>
        <HomeHeader />
      </Page.Header>
      <Page.Main className="md:flex md:flex-col justify-center items-center">
        <div className="md:w-9/12">
          {/* <div className="rounded-md bg-blue-50 p-4 mt-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  <span className="font-bold">הורים מתעניינים יקרים, כמה עדכונים חשובים:</span>
                  <br/>
                    מקווים שאנחנו מוצאים אותכם בטוב בתקופה הזו ושולחים לכם חיבוק גדול מאיתנו .
                    המלחמה הביאה את כולנו לימים מאתגרים רגשית ופיזית, גם אנחנו בגן שלנו התמודדנו עם מעבר לעבודה במקלטים וחסרונו של מנהל הגן עומרי שגוייס בצו 8.
                    אנחנו עושים כל שביכולתנו על מנת לפתוח את תהליך ההרשמה לגן בסוף ינואר-תחילת פברואר.
                    תהליך הרשמה לגן יהיה  כפי שרשום באתר שלנו .
                    אנחנו מזכירים שמי שכבר מילאו פרטים באתר החל מספטמבר 23 וקיבל מייל חוזר שהרשמה נקלטה , אין צורך למלא אותם שוב או לברר טלפונית האם הם קיימים, הכל רשום אצלנו:)
                    תודה על ההבנה, שנדע ימים שקטים
                </p>
              </div>
            </div>
          </div> */}

          {stories.map((story, index) => {
            const { title, subtitle, link, img, url } = story;
            return (
              <SectionCard
                className={`flex flex-col ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
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
        <div id="tadmit-video-container" className="mt-20 md:mt-48 w-full">
          {playTadmitVideo && (
            <TadmitVideo
              tadmitVideo={tadmitVideoYoutubeUrl}
              className="w-11/12 rounded-xl md:rounded-none md:w-full "
              mute
              autoplay
            />
          )}
        </div>
        <div className="mt-20 md:mt-40">
          <TextTitle title="אנחנו בתקשורת" className="text-center" />
          <Slider
            {...carouselSettings}
            className=" mx-auto"
            style={{ width: screenWidth - 100 }} // use CSSinJS - Tailwind is not flexible enough
          >
            {usOnMediaArticles.map(
              ({ img, link_to_article: linkToArticle }) => (
                <Article
                  img={img}
                  linkToArticle={linkToArticle}
                  key={linkToArticle}
                />
              )
            )}
          </Slider>
        </div>
        <div className="md:w-11/12 mt-20 md:mt-40">
          <TextTitle className="text-center" title='מה הלו"ז' />
          <iframe
            className="mb-24 h-96 md:h-128 sm:w-2/3 md:w-1/2 mx-auto"
            title="calendar"
            src="https://calendar.google.com/calendar/embed?showTitle=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&height=600&wkst=1&bgcolor=%23FFFFFF&src=ganyeledteva.Calendar@gmail.com&color=%23b90e28&ctz=Asia%2FJerusalem"
            scrolling="no"
          />
        </div>
      </Page.Main>
    </Page>
  );
}

export default Home;

const Article = ({ img, linkToArticle, className }) => (
  <div
    className={`flex flex-col justify-center items-center mt-5 mx-4 h-80 md:h-96  text-center text-2xl transform transition duration-500 hover:scale-110 ${className}`}
  >
    <a href={linkToArticle} target="_blank" rel="noreferrer">
      <img
        className="w-auto m-auto rounded "
        src={img}
        alt="תמונה מקדימה של כתבה מגלריית אנחנו בתקשורת"
      />
    </a>
  </div>
);
