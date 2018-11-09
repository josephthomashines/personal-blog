import * as React from "react";
import { graphql } from "gatsby";
import * as styles from "./Index.module.scss";

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name: string;
        tagline: string;
      };
    };
    allContentfulPost: {
      edges: {
        node: {
          title: string;
          slug: string;
          date: Date;
          body: {
            childMarkdownRemark: {
              html: string;
            };
          };
        };
      };
    };
  };
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        name
        tagline
      }
    }
    allContentfulPost {
      edges {
        node {
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
    }
  }
`;

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public renderPost(post: any, index: any): JSX.Element {
    return (
      <div key={index} className={styles.post}>
        <h1>{post.title}</h1>
        <span>{post.date}</span>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html
          }}
        />
      </div>
    );
  }
  public render(): JSX.Element {
    const { name, tagline } = this.props.data.site.siteMetadata;

    const posts = this.props.data.allContentfulPost.edges.map(
      edge => edge.node
    );

    return (
      <div className={styles.Container}>
        <h1>{name}</h1>
        <p>{tagline}</p>
        <div className={styles.postWrapper}>
          {posts.map((post, index) => this.renderPost(post, index))}
        </div>
      </div>
    );
  }
}
