import * as React from 'react'
import rehypeReact from 'rehype-react'
import { graphql, navigate } from 'gatsby'

import Layout from './Layout'
import OutboundLinkContainer from './OutboundLinkContainer'

import leftArrow from '../../node_modules/@fortawesome/fontawesome-free/svgs/regular/hand-point-left.svg'
import rightArrow from '../../node_modules/@fortawesome/fontawesome-free/svgs/regular/hand-point-right.svg'

import styles from '../style/post.module.scss'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { elink: OutboundLinkContainer },
}).Compiler

interface IndexPageProps {
  data: {
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
        <div className={styles.thumbnail} />
        <div>{renderAst(post.htmlAst)}</div>
      </div>
    )
  }
  public render(): JSX.Element {
    const post = this.renderPost(this.props.data.main, 0)
    const afterword = []

    if (this.props.data.previous !== null) {
      const pttr: string = this.props.data.previous.fields.readingTime.text
      afterword.push(
        <a
          href={`/${this.props.data.previous.frontmatter.date}/${
            this.props.data.previous.frontmatter.slug
          }`}
          className={styles.related}
        >
          <span>{this.props.data.previous.frontmatter.title}</span>
          <img src={leftArrow} className={styles.left} />
        </a>,
      )
    } else {
      afterword.push(<div />)
    }

    if (this.props.data.next !== null) {
      const nttr: string = this.props.data.next.fields.readingTime.text
      afterword.push(
        <a
          href={`/${this.props.data.next.frontmatter.date}/${
            this.props.data.next.frontmatter.slug
          }`}
          className={styles.related}
        >
          <span>{this.props.data.next.frontmatter.title}</span>
          <img src={rightArrow} className={styles.right} />
        </a>,
      )
    }

    afterword.push(
      <div className={styles.home}>
        <a href="/">Back to Home</a>
      </div>,
    )

    return (
      <Layout pageTitle={this.props.data.main.frontmatter.title}>
        {post}
        <div className={styles.afterword}>{afterword}</div>
      </Layout>
    )
  }
}
