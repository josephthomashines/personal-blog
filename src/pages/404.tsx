import * as React from 'react'

import Layout from '../components/Layout'

import styles from '../style/404.module.scss'

const NotFoundPage = () => (
  <Layout pageTitle={'Not Found'}>
    <div className={styles.wrapper}>
      <h1>Page not found</h1>
      <h2>Error code: 404</h2>
      <p>There is nothing to see here; move along...</p>
    </div>
  </Layout>
)

export default NotFoundPage
