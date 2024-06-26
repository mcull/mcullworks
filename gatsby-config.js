// support for .env, .env.development, and .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteUrl = process.env.URL || `https://mcull.works`

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
    title: "Marc Cull | Seasoned Engineering Leadership",
    author: `Marc Cull`,
    description: "Marc Cull - Product Engineering Leader. CPTO, CTO, VP ENG specializing in building high-performing teams and systems for rapid scaling of start-ups. Expert in talent discovery, team structure, and rapid innovation and product delivery.",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        downloadLocal: true,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },{
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `DM Sans\:300,400,400i,700`, // you can also specify font weights and styles
          `Montserrat\:300,400,400i,500,600,700`, // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en-US'
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-YS69FK66LG", // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          //exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://mcull.works',
        sitemap: 'https://mcull.works/sitemap.xml',
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Marc Cull personal site",
        short_name: "MCull Works",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#ffe491",
        theme_color: "#004ca3",
        icon: "src/images/orange_bag.png",
      },
    },
    {
      resolve: 'gatsby-remark-audio',
      options: {
        preload: 'auto',
        loop: false,
        controls: true,
        muted: false,
        autoplay: false
      }
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages }
        }) => {
          return allPages.map(page => {
            return { ...page }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            lastmod: new Date().toISOString().split('T')[0],
          }
        },
      },
    },
  ],
}
