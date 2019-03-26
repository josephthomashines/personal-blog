import React from 'react'

import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout pageTitle={'Not Found'}>
    <div
      className={styles.Container}
      style={{
        textAlign: 'center',
        border: '2px solid #ff4136',
      }}
    >
      <h1>NOT FOUND</h1>
      <p style={{ color: '#333333' }}>
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
