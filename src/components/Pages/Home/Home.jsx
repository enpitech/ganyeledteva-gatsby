import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import HomeHeader from './HomeHeader';
import Page from '../../Page/Page';
import SectionCard from '../../SectionCard';

function Home() {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      allMdx(filter: { fields: { dir: { eq: "home" } } }) {
        edges {
          node {
            frontmatter {
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
  const { stories } = frontmatter;

  return (
    <Page>
      <Page.Header>
        <HomeHeader />
      </Page.Header>
      <Page.Main className="md:flex justify-center ">
        <div className="md:w-9/12 m-auto">
          {stories.map((story, index) => {
            const { title, subtitle, link, img, url } = story;
            return (
              <SectionCard
                key={title}
                className="mt-20"
                title={title}
                subtitle={subtitle}
                path={url}
                link={link}
                img={img}
                reverse={index % 2 === 1}
              />
            );
          })}
        </div>
      </Page.Main>
    </Page>
  );
}

export default Home;
