import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import * as react from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Page from '../../Page/Page';
import PageHeader from '../../Page/PageHeader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function FAQ() {
  const data = useStaticQuery(graphql`
    query FAQQuery {
      allMdx(filter: { fields: { dir: { eq: "faq" } } }) {
        edges {
          node {
            frontmatter {
              title
              subtitle
              faqs {
                question
                answer
              }
            }
          }
        }
      }
    }
  `);

  const pageNode = data.allMdx.edges[0].node;
  const { frontmatter } = pageNode;
  const { title, subtitle, faqs } = frontmatter;

  return (
    <Page>
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          {faqs.map((item) => (
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              <react.Disclosure as="div" key={item.question} className="pt-6">
                {({ open }) => (
                  <react.Disclosure>
                    <dt className="text-lg">
                      <react.Disclosure.Button className="text-right w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">
                          {item.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </react.Disclosure.Button>
                    </dt>
                    <react.Disclosure.Panel as="dd" className="mt-2 pl-12">
                      <p className="text-right text-gray-500">{item.answer}</p>
                    </react.Disclosure.Panel>
                  </react.Disclosure>
                )}
              </react.Disclosure>
            </dl>
          ))}
        </div>
      </Page.Main>
    </Page>
  );
}

export default FAQ;
