import * as React from 'react'
import { graphql, navigate } from 'gatsby'

import styles from '../style/index.module.scss'

import Layout from '../components/Layout'

import PostPreview from '../components/PostPreview'

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
    return (
      <PostPreview
        date={post.frontmatter.date}
        key={`post-preview-${post.frontmatter.slug}`}
        slug={post.frontmatter.slug}
        tag={post.frontmatter.tag}
        time={post.fields.readingTime.text}
        title={post.frontmatter.title}
      />
    )
  }
  public render(): JSX.Element {
    const { name, tagline, author } = this.props.data.site.siteMetadata

    // @ts-ignore
    const posts = this.props.data.allMarkdownRemark.edges.map(
      (edge) => edge.node,
    )

    return (
      <Layout pageTitle={'Home'}>
        <h1 className={styles.header}>Blog Posts</h1>
        <div>{posts.map((post, index) => this.renderPost(post, index))}</div>
      </Layout>
    )
  }
}
