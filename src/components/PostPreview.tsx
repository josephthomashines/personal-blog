import * as React from 'react'

type Props = {
  date: string
  slug: string
  tag: string
  time: string
  title: string
}

export const PostPreview = (props: Props) => {
  return (
    <div>
      <div className="preview-content">
        <div className="date">
          <span>{props.date}</span>
        </div>
        <div className="timeToRead">
          <span>{props.time}</span>
        </div>
        <div className="title">
          <span>{props.title}</span>
        </div>
        <div className="tag">
          <span>{props.tag}</span>
        </div>
      </div>
    </div>
  )
}

export default PostPreview
