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
            next {
              contentful_id
            }
            previous {
              contentful_id
            }
          }
        }
      }
    `).then(result => {
      if (!result.err) {
        result.data.allContentfulPost.edges.forEach(
          ({ node, next, previous }) => {
            createPage({
              path: node.slug,
              component: path.resolve(`./src/components/BlogPost.tsx`),
              context: {
                slug: node.slug,
                contentful_id: node.contentful_id,
                // Because posts are sorted in DESC order, the previous post
                // chronologically is the next one in DESC order
                next: previous ? previous.contentful_id : null,
                previous: next ? next.contentful_id : null,
              },
            })
          },
        )
        resolve()
      }
    })
  })
}
