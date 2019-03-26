import * as React from 'react'

import Layout from '../components/Layout'

import styles from '../style/about.module.scss'

const QA = (q: string, a: string) => (
  <div className={styles.QA}>
    <h2>{q}</h2>
    <p>{a}</p>
  </div>
)

const Link = (props) => <div className={styles.link}>{props.children}</div>

const NotFoundPage = () => (
  <Layout pageTitle={'About Me'}>
    <div className={styles.wrapper}>
      <h1>About Me</h1>
      {QA(
        'Who are you?',
        'I am Joe Hines, a computer science student at Drexel Unversity.',
      )}
      {QA(
        'What do you do?',
        'I am a confident frontend web developer, novice designer, and beginner backend developer.',
      )}
      {QA('Where do you do this?', 'Philadelphia, PA.')}
      <h1>Links</h1>
      <div className={styles.links}>
        <Link>
          <span>Github</span>
        </Link>
        <Link>
          <span>Resume</span>
        </Link>
        <Link>
          <span>LinkedIn</span>
        </Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
