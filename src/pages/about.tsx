import * as React from 'react'

import Layout from '../components/Layout'

import styles from '../style/about.module.scss'

import github from '../../node_modules/@fortawesome/fontawesome-free/svgs/brands/github.svg'
import resume from '../../node_modules/@fortawesome/fontawesome-free/svgs/regular/file-pdf.svg'
import linkedin from '../../node_modules/@fortawesome/fontawesome-free/svgs/brands/linkedin.svg'

const QA = (q: string, a: string) => (
  <div className={styles.QA}>
    <h2>{q}</h2>
    <p>{a}</p>
  </div>
)

const Link = (props) => (
  <a {...props} className={styles.link}>
    {props.children}
  </a>
)

const NotFoundPage = () => (
  <Layout pageTitle={'About Me'}>
    <div className={styles.wrapper}>
      <h1>About Me</h1>
      {QA(
        'Who are you?',
        'I am Joe Hines, a computer science student at Drexel University.',
      )}
      {QA(
        'What do you do?',
        'I am a confident frontend web developer, novice designer, and beginner backend developer.',
      )}
      {QA('Where are you based?', 'Philadelphia, PA.')}
      <h1>Links</h1>
      <div className={styles.links}>
        <Link
          href="https://github.com/josephthomashines"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} />
          <span>Github</span>
        </Link>
        <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <img src={resume} />
          <span>Resume</span>
        </Link>
        <Link
          href="https://www.linkedin.com/in/josephthomashines/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} />
          <span>LinkedIn</span>
        </Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
