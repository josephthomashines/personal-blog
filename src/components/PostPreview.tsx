import * as React from 'react'

import styles from '../style/postpreview.module.scss'

type Props = {
  date: string
  slug: string
  tag: string
  time: string
  title: string
}

export const PostPreview = (props: Props) => {
  return (
    <a href={`/${props.date}/${props.slug}`}>
      <div className={styles.preview}>
        <div className={styles.dt}>
          <span>{props.date}</span>
          <span>{props.time}</span>
        </div>
        <div className={styles.title}>
          <span>{props.title}</span>
        </div>
        <div className={styles.tag}>
          <span>{props.tag}</span>
        </div>
      </div>
    </a>
  )
}

export default PostPreview
