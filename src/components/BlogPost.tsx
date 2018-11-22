import * as React from 'react'
import { graphql } from 'gatsby'
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
    contentfulPost: {
      title
    }
  }
}

export const blogQuery = graphql`
  query($contentful_id: String!) {
    site {
      siteMetadata {
        name
        tagline
      }
    }
    contentfulPost(contentful_id: { eq: $contentful_id }) {
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
`

export default class BlogPost extends React.Component<IndexPageProps, {}> {
  public renderPost(post: any, index: any): JSX.Element {
    return (
      <div key={index} className={styles.post}>
        <h1>{post.title}</h1>
        <span>{post.date}</span>
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

    const post = this.renderPost(this.props.data.contentfulPost, 0)

    return (
      <Layout tagline={tagline} name={name}>
        {post}
      </Layout>
    )
  }
}
