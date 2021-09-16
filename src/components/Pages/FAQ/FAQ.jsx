import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import SEO from "../../SEO";
import TextTitle from "../../TextTitle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FAQ() {
  const data = useStaticQuery(graphql`
    query FAQQuery {
      allMdx(filter: { fields: { dir: { eq: "faq" } } }) {
        edges {
          node {
            fields {
              dir
            }
            frontmatter {
              title
              subtitle
              contact_text
              faqs_sections {
                section_title
                faqs {
                  question
                  answer
                }
              }
            }
          }
        }
      }
    }
  `);

  const pageNode = data.allMdx.edges[0].node;
  const { frontmatter, fields } = pageNode;
  const {
    title,
    subtitle,
    contact_text: contactText,
    faqs_sections: faqsSections,
  } = frontmatter;

  const pageSEOData = {
    title,
    description: undefined,
    image: undefined,
    pagePath: fields.dir,
  };

  return (
    <Page>
      <SEO pageSEOData={pageSEOData} />
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-blue-faq-page-header1 to-blue-faq-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        {faqsSections.map(({ section_title: sectionTitle, faqs }) => {
          return (
            <div key={sectionTitle}>
              <TextTitle
                title={sectionTitle}
                className="text-center py-2"
              ></TextTitle>

              <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                {faqs.map((item, index) => (
                  <dl
                    className="mt-6 space-y-6 divide-y divide-gray-200"
                    key={item.question + index}
                  >
                    <Disclosure as="div" className="pt-6">
                      {({ open }) => (
                        <>
                          <dt className="text-lg">
                            <Disclosure.Button className="focus:outline-none text-right w-full flex justify-between items-start text-gray-400">
                              <span className="font-medium text-gray-900">
                                {item.question}
                              </span>
                              <span className="ml-6 h-7 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-6 w-6 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as="dd" className="mt-2 pl-12">
                            <p className="text-right text-gray-500 whitespace-pre-wrap">
                              {item.answer}
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </dl>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center mt-20">
          <div className="text-xl">{contactText}</div>
          <Link to={"/contact"}>
            <div className="mt-5 inline-block rounded-full text-2xl text-center py-1 px-3 border-2 border-black bg-red-link text-white">
              ליצירת קשר
            </div>
          </Link>
        </div>
      </Page.Main>
    </Page>
  );
}

export default FAQ;
