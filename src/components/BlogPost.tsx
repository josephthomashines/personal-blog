import * as React from 'react'
import rehypeReact from 'rehype-react'
import { graphql, navigate } from 'gatsby'

import * as styles from '../style/index.module.scss'

import Layout from './Layout'
import OutboundLinkContainer from './OutboundLinkContainer'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { elink: OutboundLinkContainer },
}).Compiler

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name
        tagline
        author
      }
    }
    main: {
      frontmatter: {
        title: string
        date: string
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
      fields: {
        readingTime: {
          text: string
        }
      }
      htmlAst
    }
    next: {
      frontmatter: {
        title: string
        date: string
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
      fields: {
        readingTime: {
          text: string
        }
      }
    }
    previous: {
      frontmatter: {
        title: string
        date: string
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
      fields: {
        readingTime: {
          text: string
        }
      }
    }
  }
}

export const blogQuery = graphql`
  query($id: String!, $next: [String], $previous: [String]) {
    site {
      siteMetadata {
        name
        tagline
        author
      }
    }
    main: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
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
      fields {
        readingTime {
          text
        }
      }
      htmlAst
    }
    next: markdownRemark(id: { in: $next }) {
      frontmatter {
        title
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
      fields {
        readingTime {
          text
        }
      }
    }
    previous: markdownRemark(id: { in: $previous }) {
      frontmatter {
        title
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
      fields {
        readingTime {
          text
        }
      }
    }
  }
`

export default class BlogPost extends React.Component<IndexPageProps, {}> {
  public renderPost(post: any, index: any): JSX.Element {
    let ttr: string = post.fields.readingTime.text
    return (
      <div key={index} className={styles.post}>
        <h1>{post.frontmatter.title}</h1>
        <span>{`${post.frontmatter.date} • ${ttr}`}</span>
        <div className={styles.thumbnail}>
          <img
            src={post.frontmatter.thumbnail.childImageSharp.fluid.src}
            key={index}
            alt={`post-${index}`}
          />
        </div>
        <div>{renderAst(post.htmlAst)}</div>
      </div>
    )
  }
  public render(): JSX.Element {
    const { name, tagline, author } = this.props.data.site.siteMetadata

    const post = this.renderPost(this.props.data.main, 0)
    const afterword = []

    if (this.props.data.previous !== null) {
      const pttr: string = this.props.data.previous.fields.readingTime.text
      afterword.push(
        <div
          key={this.props.data.previous.frontmatter.slug}
          className={`${styles.postPreview} ${styles.previous}`}
          onClick={() =>
            navigate(
              `/${this.props.data.previous.frontmatter.date}/${
                this.props.data.previous.frontmatter.slug
              }`,
            )
          }
        >
          <div role='link' tabIndex={0} className={styles.filter}>
            {/* <img
              src={
                this.props.data.previous.frontmatter.thumbnail.childImageSharp
                  .fluid.src
              }
              alt='prev'
            /> */}
            <h1>&larr; {this.props.data.previous.frontmatter.title}</h1>
            {/* <p>{this.props.data.previous.tag}</p> */}
            <span>{`${
              this.props.data.previous.frontmatter.date
            } • ${pttr}`}</span>
          </div>
        </div>,
      )
    } else {
      afterword.push(
        <div className={`${styles.postPreview} ${styles.previous}`} />,
      )
    }

    if (this.props.data.next !== null) {
      const nttr: string = this.props.data.next.fields.readingTime.text
      afterword.push(
        <div
          key={this.props.data.next.frontmatter.slug}
          className={`${styles.postPreview} ${styles.next}`}
          onClick={() =>
            navigate(
              `/${this.props.data.next.frontmatter.date}/${
                this.props.data.next.frontmatter.slug
              }`,
            )
          }
        >
          <div role='link' tabIndex={0} className={styles.filter}>
            {/* <img
              src={
                this.props.data.next.frontmatter.thumbnail.childImageSharp.fluid
                  .src
              }
              alt='next'
            /> */}
            <h1>{this.props.data.next.frontmatter.title} &rarr;</h1>
            {/* <p>{this.props.data.next.tag}</p> */}
            <span>{`${this.props.data.next.frontmatter.date} • ${nttr}`}</span>
          </div>
        </div>,
      )
    }
    return (
      <Layout pageTitle={this.props.data.main.frontmatter.title}>
        {post}
        <div className={styles.afterword}>{afterword}</div>
      </Layout>
    )
  }
}
