import * as React from 'react'

import styles from '../style/header.module.scss'

import bezier from '../images/Bezier.svg'

type Props = {
  title: string
}

type State = {
  menuShown: boolean
}

export class Header extends React.Component<Props, State> {
  public constructor(props) {
    super(props)
    this.state = { menuShown: false }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  public toggleMenu() {
    this.setState({ menuShown: !this.state.menuShown })
  }

  public render() {
    const showClass = this.state.menuShown ? ` ${styles.show}` : ''

    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <a href="/" target="_blank" rel="noopener noreferrer">
            {this.props.title}
          </a>
        </div>
        <img src={bezier} />
        <div
          className={styles.menuButton + showClass}
          onClick={() => this.toggleMenu()}
        >
          <div className={styles.bar1 + showClass} />
          <div className={styles.bar2 + showClass} />
          <div className={styles.bar3 + showClass} />
        </div>
        <div className={styles.menu + showClass}>
          <a href="/" target="_blank" rel="noopener noreferrer">
            Home
          </a>
          <a href="/about" target="_blank" rel="noopener noreferrer">
            About Me
          </a>
        </div>
      </div>
    )
  }
}

export default Header
