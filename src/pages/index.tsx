import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import * as styles from '../style/index.module.scss'

import Layout from '../components/Layout'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name: string
        tagline: string
        author: string
      }
    }
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            title: string
            date: string
            tag: string
            slug: string
            thumbnail: {
              childImageSharp: {
                fluid: {
                  tracedSVG
                  src
                }
              }
            }
          }
          htmlAst
          fields: {
            readingTime: {
              text: string
            }
          }
        }
      }
    }
  }
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        name
        tagline
        author
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            tag
            date
            slug
            thumbnail {
              childImageSharp {
                fluid {
                  tracedSVG
                  src
                }
              }
            }
          }
          htmlAst
          fields {
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public renderPost(post: any, index: any): JSX.Element {
    const ttr: string = post.fields.readingTime.text
    return (
      <React.Fragment key={`post-preview-fragment-${index}`}>
        {post.frontmatter.thumbnail ? (
          <div key={index} className={styles.postPreview}>
            <div
              onClick={() =>
                navigate(`/${post.frontmatter.date}/${post.frontmatter.slug}`)
              }
              role='link'
              tabIndex={0}
              className={styles.filter}
            >
              <img
                src={post.frontmatter.thumbnail.childImageSharp.fluid.src}
                alt='thumbnail'
              />
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.tag}</p>
              <span>{`${post.frontmatter.date} • ${ttr}`}</span>
            </div>
          </div>
        ) : (
          <div key={index} className={styles.postPreview}>
            <div
              onClick={() =>
                navigate(`/${post.frontmatter.date}/${post.frontmatter.slug}`)
              }
              role='link'
              tabIndex={0}
              className={styles.filter}
            >
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.tag}</p>
              <span>{`${post.frontmatter.date} • ${ttr}`}</span>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
  public render(): JSX.Element {
    const { name, tagline, author } = this.props.data.site.siteMetadata

    // @ts-ignore
    const posts = this.props.data.allMarkdownRemark.edges.map(edge => edge.node)

    return (
      <Layout pageTitle={'Home'}>
        <div className={styles.ContainerPreview}>
          {posts.map((post, index) => this.renderPost(post, index))}
        </div>
      </Layout>
    )
  }
}
