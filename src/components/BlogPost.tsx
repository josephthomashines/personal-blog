import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import * as styles from '../style/index.module.scss'

import Layout from '../components/Layout'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name
        tagline
      }
    }
    main: {
      title
      slug
      date
      body: {
        childMarkdownRemark: {
          html
        }
      }
      thumbnail: {
        fixed: {
          tracedSVG
          src
        }
      }
    }
    next: {
      title
      slug
      date
      tag
      thumbnail: {
        fixed: {
          tracedSVG
          src
        }
      }
    }
    previous: {
      title
      slug
      date
      tag
      thumbnail: {
        fixed: {
          tracedSVG
          src
        }
      }
    }
  }
}

export const blogQuery = graphql`
  query($contentful_id: String!, $next: String, $previous: String) {
    site {
      siteMetadata {
        name
        tagline
      }
    }
    main: contentfulPost(contentful_id: { eq: $contentful_id }) {
      title
      slug
      date
      body {
        childMarkdownRemark {
          html
        }
      }
      thumbnail {
        fixed(width: 2000, height: 1000) {
          tracedSVG
          src
        }
      }
    }
    next: contentfulPost(contentful_id: { eq: $next }) {
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
    previous: contentfulPost(contentful_id: { eq: $previous }) {
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
`

// TODO: Get

export default class BlogPost extends React.Component<IndexPageProps, {}> {
  public renderPost(post: any, index: any): JSX.Element {
    return (
      <div key={index} className={styles.post}>
        <h1>{post.title}</h1>
        <span>{post.date}</span>
        <div className={styles.thumbnail}>
          <img src={post.thumbnail.fixed.src} key={index} />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
      </div>
    )
  }
  public render(): JSX.Element {
    const { name, tagline } = this.props.data.site.siteMetadata

    const post = this.renderPost(this.props.data.main, 0)
    const afterword = []

    if (this.props.data.previous) {
      afterword.push(
        <div
          key={this.props.data.previous.slug}
          className={`${styles.postPreview} ${styles.previous}`}
        >
          <div
            onClick={() => navigate(`/${this.props.data.previous.slug}`)}
            role='link'
            tabIndex={0}
            className={styles.filter}
          >
            <img src={this.props.data.previous.thumbnail.fixed.src} />
            <h1>{this.props.data.previous.title}</h1>
            <p>{this.props.data.previous.tag}</p>
            <span>{this.props.data.previous.date}</span>
          </div>
        </div>,
      )
    }

    if (this.props.data.next) {
      afterword.push(
        <div
          key={this.props.data.next.slug}
          className={`${styles.postPreview} ${styles.next}`}
        >
          <div
            onClick={() => navigate(`/${this.props.data.next.slug}`)}
            role='link'
            tabIndex={0}
            className={styles.filter}
          >
            <img src={this.props.data.next.thumbnail.fixed.src} />
            <h1>{this.props.data.next.title}</h1>
            <p>{this.props.data.next.tag}</p>
            <span>{this.props.data.next.date}</span>
          </div>
        </div>,
      )
    }
    return (
      <Layout tagline={tagline} name={name}>
        {post}
        <div className={styles.afterword}>{afterword}</div>
      </Layout>
    )
  }
}
