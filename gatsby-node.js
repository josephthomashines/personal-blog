const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
                date
                title
                slug
              }
              id
            }
            next {
              id
            }
            previous {
              id
            }
          }
        }
      }
    `).then(result => {
      if (!result.err) {
        result.data.allMarkdownRemark.edges.forEach(
          ({ node, next, previous }) => {
            createPage({
              path: `${node.frontmatter.date}/${node.frontmatter.slug}`,
              component: path.resolve(`./src/components/BlogPost.tsx`),
              context: {
                slug: `${node.frontmatter.date}/${node.frontmatter.slug}`,
                id: node.id,
                // Because posts are sorted in DESC order, the PREVIOUS post
                // chronologically is the NEXT one in DESC order
                next: previous !== null ? previous.id : '',
                previous: next !== null ? next.id : '',
              },
            })
          },
        )
        resolve()
      }
    })
  })
}
