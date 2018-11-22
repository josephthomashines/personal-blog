const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPost {
          edges {
            node {
              contentful_id
              title
              slug
              date
              body {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulPost.edges.forEach(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve(`./src/components/BlogPost.tsx`),
          context: {
            slug: node.slug,
            contentful_id: node.contentful_id,
          },
        })
      })
      resolve()
    })
  })
}
