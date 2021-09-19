import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import ContactForm from "./ContactForm";
import _ from "lodash";
import ReasonBtn from "./ReasonBtn";
import SEO from "../../SEO/SEO";

const FORM_TYPES = Object.freeze({
  WORK_IN_GAN: 1,
  GET_PRODUCTS: 2,
  GENERAL: 3,
});

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
    pagePath: "contact",
  };

  const [formType, setFormType] = useState(FORM_TYPES.WORK_IN_GAN);

  useEffect(() => {
    try {
      if (!_.isNil(window)) {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParamFormType = Number(urlParams.get("formType"));
        if (
          !_.isNil(queryParamFormType) &&
          FORM_TYPES.WORK_IN_GAN <= queryParamFormType &&
          queryParamFormType <= FORM_TYPES.GENERAL
        ) {
          setFormType(queryParamFormType);
        }
      }
    } catch {
      console.log("error in contact query params");
    }
  }, []);

  return (
    <Page>
      <SEO pageSEOData={pageSEOData} />
      <Page.Header>
        <SEO pageSEOData={pageSEOData} />
        <PageHeader
          title={title}
          subtitle={subtitle || `${placeAddress},  ${placePhone}`}
          backgroundColorClass="bg-blue-contact-page-header"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-96 md:h-36">
          <ReasonBtn
            active={formType === 1}
            content="בא לי לעבוד אתכם"
            onClick={() => setFormType(FORM_TYPES.WORK_IN_GAN)}
          />
          <ReasonBtn
            active={formType === 2}
            content="אני מתעניינ.ת בקורסים והרצאות שלכם"
            onClick={() => setFormType(FORM_TYPES.GET_PRODUCTS)}
          />
          <ReasonBtn
            active={formType === 3}
            content="אמממ, משהו אחר"
            onClick={() => setFormType(FORM_TYPES.general)}
          />
        </div>

        {!formType ? null : <ContactForm formType={formType} />}
      </Page.Main>
    </Page>
  );
}
