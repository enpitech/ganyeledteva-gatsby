import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Page from '../../Page/Page';
import PageHeader from '../../Page/PageHeader';
import ContactForm from './ContactForm';

import ReasonBtn from './ReasonBtn';
import SEO from '../../SEO/SEO';

export default function Contact() {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      allMdx(filter: { fields: { dir: { eq: "contact" } } }) {
        edges {
          node {
            frontmatter {
              title
              subtitle
              placeTitle
              placeAddress
              placePhone
            }
          }
        }
      }
    }
  `);

  const pageNode = data.allMdx.edges[0].node;
  const { frontmatter } = pageNode;
  const { title, subtitle, placeAddress, placePhone } = frontmatter;
  const pageSEOData = {
    title,
    description: undefined, // description to be added later by Tzachi
    pagePath: 'contact',
  };

  const [formType, setFormType] = useState(1);

  return (
    <Page>
      <Page.Header>
        <SEO pageSEOData={pageSEOData} />
        <PageHeader
          title={title}
          subtitle={subtitle || `${placeAddress},  ${placePhone}`}
          backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-96 md:h-36">
          <ReasonBtn
            active={formType === 1}
            content="בא לי לעבוד אתכם"
            onClick={() => setFormType(1)}
          />
          <ReasonBtn
            active={formType === 2}
            content="אני מתעניינ.ת במוצרים או שירותים חינוכיים שראיתי בחממה לחדשנות בגיל הרך"
            onClick={() => setFormType(2)}
          />
          <ReasonBtn
            active={formType === 3}
            content="אמממ, משהו אחר"
            onClick={() => setFormType(3)}
          />
        </div>

        {!formType ? null : <ContactForm formType={formType} />}
      </Page.Main>
    </Page>
  );
}
