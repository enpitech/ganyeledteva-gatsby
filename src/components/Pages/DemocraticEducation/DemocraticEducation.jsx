import React from 'react';
import Page from '../../Page/Page';
import PageHeader from '../../Page/PageHeader';
import {useStaticQuery,graphql} from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx";

function DemocraticEducation() {

  const data = useStaticQuery(graphql`
    query DemocEducQuery {
      allMdx(
        filter: { fields: { dir: { eq: "democraticeducation" } } }
      ) {
        edges {
          node {
            fields {
              slug
              date
              dir
            }
            excerpt
            timeToRead
            frontmatter {
              title
              date
              subtitle
              images {
                alt
                src
              }
              bg
            }
            body
          }
        }
      }    }
  `)

  const post = data.allMdx.edges[0].node;
  const {frontmatter,body} = post;
  const {title,subtitle,images} = frontmatter;


  return (
    <Page>
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-green-300 to-blue-400"
          backgroundPatternClass="bg-patt2"
        />
      </Page.Header>
      <Page.Main>
        <div className='lg:grid grid-cols-10'>
          <div className='col-span-4 col-start-2 lg:ml-3 pb-10'>
        <MDXRenderer>{body}</MDXRenderer>
        </div>
        <div className='col-span-4 lg:m-10 float-right'>
          {images.map(img =>
          <div className="mb-5 lg:m-5 shadow-postImg">
          <img src={img.src} alt={img.alt}/>
        </div>
          )}
        </div>
        </div>
      </Page.Main>
    </Page>
  );
}

export default DemocraticEducation;

