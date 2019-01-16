import * as React from 'react'
import rehypeReact from 'rehype-react'
import { graphql, navigate } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import * as styles from '../style/index.module.scss'

import Layout from '../components/Layout'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 'ga-link': OutboundLink },
}).Compiler

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
          htmlAst
          fields: {
            readingTime: {
              text: string
            }
          }
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
      body: {
        childMarkdownRemark: {
          fields: {
            readingTime: {
              text: string
            }
          }
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
      body: {
        childMarkdownRemark: {
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
          htmlAst
          fields {
            readingTime {
              text
            }
          }
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
      body {
        childMarkdownRemark {
          fields {
            readingTime {
              text
            }
          }
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
      body {
        childMarkdownRemark {
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

export default class BlogPost extends React.Component<IndexPageProps, {}> {
  public renderPost(post: any, index: any): JSX.Element {
    let ttr: string = post.body.childMarkdownRemark.fields.readingTime.text
    return (
      <div key={index} className={styles.post}>
        <h1>{post.title}</h1>
        <span>{`${post.date} • ${ttr}`}</span>
        <div className={styles.thumbnail}>
          <img
            src={post.thumbnail.fixed.src}
            key={index}
            alt={`post-${index}`}
          />
        </div>
        <div>{renderAst(post.body.childMarkdownRemark.htmlAst)}</div>
      </div>
    )
  }
  public render(): JSX.Element {
    const { name, tagline } = this.props.data.site.siteMetadata

    const post = this.renderPost(this.props.data.main, 0)
    const afterword = []

    if (this.props.data.previous) {
      const pttr: string = this.props.data.previous.body.childMarkdownRemark
        .fields.readingTime.text
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
            <img
              src={this.props.data.previous.thumbnail.fixed.src}
              alt='prev'
            />
            <h1>{this.props.data.previous.title}</h1>
            <p>{this.props.data.previous.tag}</p>
            <span>{`${this.props.data.previous.date} • ${pttr}`}</span>
          </div>
        </div>,
      )
    }

    if (this.props.data.next) {
      const nttr: string = this.props.data.next.body.childMarkdownRemark.fields
        .readingTime.text
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
            <img src={this.props.data.next.thumbnail.fixed.src} alt='next' />
            <h1>{this.props.data.next.title}</h1>
            <p>{this.props.data.next.tag}</p>
            <span>{`${this.props.data.next.date} • ${nttr}`}</span>
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
