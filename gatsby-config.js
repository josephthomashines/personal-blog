let siteName = 'josephhines'
let siteShortName = 'johi'
let siteTagline = 'Writing code, among other things.'
let siteAuthor = 'Joseph Hines'

module.exports = {
  siteMetadata: {
    name: siteName,
    tagline: siteTagline,
    author: siteAuthor,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/static`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-reading-time`,
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteName,
        short_name: siteShortName,
        start_url: '/',
        background_color: '#ff4136',
        theme_color: '#ff4136',
        display: 'minimal-ui',
        icon: 'src/images/logo.ico',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-126266466-2',
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
}
