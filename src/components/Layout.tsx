import * as React from 'react'
import * as styles from '../style/index.module.scss'
import { navigate } from 'gatsby'
import { Helmet } from 'react-helmet'

import logo from '../images/logo.png'

export interface ILayoutProps {
  children: any
  name: string
  tagline: string
}

class Layout extends React.Component<ILayoutProps> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Helmet
          title={this.props.name}
          meta={[
            { name: 'description', content: this.props.tagline },
            {
              name: 'keywords',
              content:
                'blog, CS, Computer Science, Drexel, Web Development, Web Design',
            },
          ]}
        >
          <html lang='en' />
        </Helmet>
        <div className={styles.header}>
          <h1 onClick={() => navigate(`/`)} role='link' tabIndex={0}>
            <img src={logo} alt='logo' />
            <em>{this.props.name}</em>
          </h1>
          <p>{this.props.tagline}</p>
        </div>
        <div
          className={styles.Container}
          // style={{ minHeight: `${window.innerHeight}px` }}
        >
          <div className={styles.postWrapper}>{this.props.children}</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.message}>
            <h2>That's all, folks</h2>
          </div>
          <div className={styles.links}>
            <div className={styles.wrapper}>
              <h2>links</h2>
              <div>
                <p>
                  <a
                    href='https://josephthomashines.com'
                    target='_blank'
                    rel='noopener'
                  >
                    CV Site
                  </a>
                </p>
                <p>
                  <a
                    href='http://github.com/josephthomashines'
                    target='_blank'
                    rel='noopener'
                  >
                    Github
                  </a>
                </p>
                <p>
                  <a
                    href='https://www.linkedin.com/in/joseph-hines-iii-b58923139/'
                    target='_blank'
                    rel='noopener'
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.goodbye}>
            <h2>Copyright &copy; {new Date().getFullYear()} Joseph Hines</h2>
            <h4>All Rights Reserved.</h4>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
