import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Page from "../../Page/Page";
import PageHeader from "../../Page/PageHeader";
import SEO from "../../SEO";
import { siteRoutes } from "../../../../data/SiteConfig";
import { useStaticQuery, graphql, Link } from "gatsby";
import TextTitle from "../../TextTitle";
import Carousel from "~src/components/Carousel";

export default function Products() {
  const data = useStaticQuery(graphql`
    query productsQuery {
      allMdx(filter: { fields: { dir: { eq: "products" } } }) {
        edges {
          node {
            fields {
              dir
            }
            frontmatter {
              title
              subtitle
              imgs_and_vids_title
              products_images {
                alt
                src
              }
              products_videos {
                video
                video_title
              }
            }
            body
          }
        }
      }
    }
  `);

  const {
    title,
    subtitle,
    products_images: productsImages,
    products_videos: productsVideos,
    imgs_and_vids_title: imagesAndVideosTitle,
  } = data.allMdx.edges[0].node.frontmatter;
  const { body } = data.allMdx.edges[0].node;

  const contactPageRouteObject = siteRoutes.filter(
    (route) => route.name === "צור קשר"
  )[0];

  const currentPageRouteObject = siteRoutes.filter(
    (route) => route.href === `/${data.allMdx.edges[0].node.fields.dir}`
  )[0];

  const currentPageTitle = currentPageRouteObject?.name || "מוצרים חינוכיים";

  const contactPageRoute = contactPageRouteObject?.href || "/"; // home page as default value

  const pageSEOData = {
    title: currentPageTitle,
    description: undefined,
    dir: data.allMdx.edges[0].node.fields.dir,
  };

  return (
    <Page>
      <SEO pageSEOData={pageSEOData} />
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main>
        <div className="mr-5 md:mr-20">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <div className="text-center">
          <Link to={contactPageRoute}>
            <div className="inline-block rounded-full text-2xl text-center py-1 px-3 border-2 border-black bg-red-link text-white">
              מעניין אתכם? צרו איתנו קשר
            </div>
          </Link>
        </div>
        <div>
          {imagesAndVideosTitle ? (
            <TextTitle
              title={imagesAndVideosTitle}
              className="text-center py-10"
            />
          ) : null}
          <Carousel time={8000}>
            {productsImages.map((img) => (
              <img className="h-96" key={img.src} src={img.src} alt={img.alt} />
            ))}
          </Carousel>
        </div>

        <div className="py-10">
          {productsVideos.map(({ video_title: videoTitle, video: src }) =>
            src ? (
              <div key={videoTitle}>
                {videoTitle ? (
                  <TextTitle title={videoTitle} className="text-center py-10" />
                ) : null}
                <video className="m-auto w-2/3 h-2/3 " controls>
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            ) : null
          )}
        </div>
      </Page.Main>
    </Page>
  );
}
