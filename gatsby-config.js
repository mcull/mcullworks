// support for .env, .env.development, and .env.production
require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://mcull.works/",
    title: "Marc Cull | Seasoned Engineering Leadership",
    author: `Marc Cull`,
    description: "Personal Homepage for Marc Cull",
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
  ],
}
