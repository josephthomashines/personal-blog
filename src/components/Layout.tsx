import * as React from 'react'
import { navigate, StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styles from '../style/layout.module.scss'

import Header from './Header'

export interface ILayoutProps {
  children: any
  pageTitle?: string
}

export const layoutQuery = graphql`
  query layoutQuery {
    site {
      siteMetadata {
        name
        tagline
        author
        shortName
      }
    }
  }
`

export type layoutResponse = {
  site: {
    siteMetadata: {
      name: string
      tagline: string
      author: string
      shortName: string
    }
  }
}

class Layout extends React.Component<
  ILayoutProps,
  { loaded: boolean; menuShown: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { loaded: false, menuShown: false }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  public toggleMenu() {
    this.setState({ menuShown: !this.state.menuShown })
  }

  public componentDidMount() {
    this.setState({ loaded: true })
  }

  public render(): JSX.Element {
    return (
      <StaticQuery
        query={layoutQuery}
        render={(data: layoutResponse) => {
          return (
            <React.Fragment>
              <Helmet
                title={
                  this.props.pageTitle
                    ? `${this.props.pageTitle} - ${data.site.siteMetadata.name}`
                    : data.site.siteMetadata.name
                }
                meta={[
                  {
                    name: 'description',
                    content: data.site.siteMetadata.tagline,
                  },
                  {
                    name: 'keywords',
                    content:
                      'blog, CS, Computer Science, Drexel, Web Development, Web Design',
                  },
                  { name: 'author', content: data.site.siteMetadata.author },
                ]}
              >
                <html lang="en" />
              </Helmet>
              {this.state.loaded ? (
                <div className={styles.main}>
                  <div className={styles.header}>
                    <Header title={data.site.siteMetadata.shortName} />
                  </div>
                  <div className={styles.container}>
                    <div className={styles.postWrapper}>
                      {this.props.children}
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </React.Fragment>
          )
        }}
      />
    )
  }
}

export default Layout
