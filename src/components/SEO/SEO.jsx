import React from "react";
import { Helmet } from "react-helmet";
import urljoin from "url-join";
import moment from "moment";
import config from "../../../data/SiteConfig";

/**
 * @param postSEOData is for post type pages
 * @param pageSEOData is for page type pages
 * the SEO for post type pages is different from a regular page,
 * so we differentiate between post type pages and page type pages
 */

function SEO({ postSEOData, pageSEOData }) {
  let title;
  let description;
  let image;
  let postURL;
  let pageURL;
  let postNode; // so getPublicationDate function will recognize this variable

  if (postSEOData) {
    const { postPath } = postSEOData;
    ({ postNode } = postSEOData);
    const postMeta = postNode.frontmatter;
    ({ title } = postMeta);
    description = postMeta.description
      ? postMeta.description
      : postNode.excerpt;
    image = postMeta.cover;
    postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
  } else if (pageSEOData) {
    ({ title, description, image } = pageSEOData);
    if (pageSEOData.pagePath)
      pageURL = urljoin(
        config.siteUrl,
        config.pathPrefix,
        pageSEOData.pagePath
      );
  }

  if (!title) title = config.siteTitle;
  if (!description) description = config.siteDescription;
  if (!image) image = config.siteLogo;

  const getImagePath = (imageURI) => {
    if (
      !imageURI.match(
        `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
      )
    )
      return urljoin(config.siteUrl, config.pathPrefix, imageURI);

    return imageURI;
  };

  const getPublicationDate = () => {
    if (!postNode) return null;

    if (!postNode.frontmatter) return null;

    if (!postNode.frontmatter.date) return null;

    return moment(postNode.frontmatter.date, config.dateFromFormat).toDate();
  };

  if (image) {
    image = getImagePath(image);
  }

  const datePublished = getPublicationDate();

  const blogURL = urljoin(config.siteUrl, config.pathPrefix);
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
    },
  ];
  if (postSEOData) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": postURL,
              name: title,
              image,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
        headline: title,
        image: { "@type": "ImageObject", url: image },
        datePublished,
        description,
      }
    );
  }
  const urlForMeta = postSEOData ? postURL : pageSEOData ? pageURL : blogURL;

  return (
    <Helmet>
      {/* General tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="canonical" href={urlForMeta} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={postSEOData ? "article" : "website"} />
      <meta property="og:site_name" content={config.siteTitle} />
      <meta property="og:url" content={urlForMeta} />
      <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ""}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;
