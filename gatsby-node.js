/**
 * How to create pages in Gatsby: https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
 */

/* eslint "no-console": "off" */

const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const siteConfig = require('./data/SiteConfig');
const ganDirName = 'gan'
const weeklyUpdateDirName = 'weekly-update'

// Create slug and date fields if exists in frontmatter
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${parsedFilePath.dir}/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: 'date', value: date.toISOString() });
      }
    }
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'dir', value: parsedFilePath.dir });
    createNodeField({ node, name: 'filename', value: parsedFilePath.name });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const weeklyPostPage = path.resolve("./src/templates/WeeklyUpdatePostTemplate.jsx"); 
   const weeklyUpdatePage = path.resolve("./src/components/Pages/WeeklyUpdate/weekly-update.jsx");
  const ganPostPage = path.resolve("./src/templates/GanSectionTemplate.jsx");
  const ganPage = path.resolve("./src/components/Pages/Gan/Gan.jsx");
  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMdx{
        edges {
          node {
            fields {
              slug
              dir
            }
            frontmatter {
              title
              subtitle
              date
              img
            }
            body
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  // The relevant posts data
  const postsEdges = markdownQueryResult.data.allMdx.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Paging
  createPage({
    path: `/weekly-update`,
    component: weeklyUpdatePage,
  });

  createPage({
    path: `/gan`,
    component: ganPage,
  });
  /** We will use this for the weekly-updates blog */
  postsEdges.forEach((edge, index) => {
    if(edge.node.fields.dir === ganDirName){
         createPage({
      path: edge.node.fields.slug, 
      component: ganPostPage,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  }
  else if(edge.node.fields.dir === weeklyUpdateDirName){
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug, 
      component: weeklyPostPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    })
  }
    });
  }



