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
      }
    }
    allContentfulPost: {
      edges: {
        node: {
          title: string
          slug: string
          date: Date
          tag: string
          thumbnail: {
            fixed(
              width: 2000,
              height: 1000,
            ): {
              tracedSVG: string
              src: string
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
      }
    }
    allContentfulPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          slug
          date
          tag
          thumbnail {
            fixed(width: 2000, height: 1000) {
              tracedSVG
              src
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
      <React.Fragment key={`post-preview-fragment-${index}`}>
        {post.thumbnail ? (
          <div
            style={{
              backgroundImage: `url("${post.thumbnail.fixed.src}"), url("${
                post.thumbnail.fixed.tracedSVG
              }")`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}
            key={index}
            className={styles.postPreview}
          >
            <div
              onClick={() => navigate(`/${post.slug}`)}
              role='link'
              tabIndex={0}
              className={styles.filter}
            >
              <h1>{post.title}</h1>
              <p>{post.tag}</p>
              <span>{post.date}</span>
            </div>
          </div>
        ) : (
          <div key={index} className={styles.postPreview}>
            <div
              onClick={() => navigate(`/${post.slug}`)}
              role='link'
              tabIndex={0}
              className={styles.filter}
            >
              <h1>{post.title}</h1>
              <p>{post.tag}</p>
              <span>{post.date}</span>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
  public render(): JSX.Element {
    const { name, tagline } = this.props.data.site.siteMetadata

    // @ts-ignore
    const posts = this.props.data.allContentfulPost.edges.map(edge => edge.node)

    return (
      <Layout tagline={tagline} name={name}>
        <div className={styles.ContainerPreview}>
          {posts.map((post, index) => this.renderPost(post, index))}
        </div>
      </Layout>
    )
  }
}
