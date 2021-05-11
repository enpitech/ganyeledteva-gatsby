// import React from "react"
// import { graphql, Link } from "gatsby"
// import Layout from "../components/layout"
// // import SEO from "../components/seo"

// export default function Template({data}) {
//     const { markdownRemark } = data
//     const { frontmatter } = markdownRemark
//     return (
//     <Layout>
//         {/* <SEO title={frontmatter.title} /> */}

//         <h1>{frontmatter.title}</h1>
//         <div>Publish Date: {frontmatter.date}</div>
//         <div 
//             dangerouslySetInnerHTML={{ __html: html }}
//         />
//     </Layout>
//   )
// }

// export const pageQuery = graphql`
//   query($path: String!) {
//     markdownRemark(fileAbsolutePath: "C:\Users\idans\Desktop\ganyeledteva\ganyeledteva-gatsby\src\markdowns\Big_Sample_Post.md" ) {
//       frontmatter {
//         title
//         cover
//         category
//         date
//         path
//         tags
//       }
//     }
//   }
// `
// print("pageQuery: ",pageQuery)