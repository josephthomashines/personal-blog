import * as React from 'react'
import * as styles from '../style/index.module.scss'
import { navigate } from 'gatsby'

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
        <div className={styles.header}>
          <div className={styles.fixed}>
            <h1 onClick={() => navigate(`/`)} role='link' tabIndex={0}>
              <img src={logo} />
              {this.props.name}
            </h1>
            <p>{this.props.tagline}</p>
          </div>
        </div>
        <div className={styles.Container}>
          <div className={styles.postWrapper}>{this.props.children}</div>
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
