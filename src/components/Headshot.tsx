import * as React from 'react'

import styles from '../style/headshot.module.scss'

import headshot from '../images/headshot.jpg'

type Props = {
  className: string
}

export const Headshot = (props: Props) => {
  return (
    <div className={styles.userIcon + ` ${props.className}`}>
      <img src={headshot} />
    </div>
  )
}

export default Headshot
