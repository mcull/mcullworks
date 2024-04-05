import * as React from "react"
import { graphql } from "gatsby"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { Container, Heading, Box, Subhead, Kicker, Text } from "../components/ui"
import AudioPlayer from 'react-h5-audio-player';
import './styles.css';
import SEOHead from "../components/head"

export const Head = (props) => {
  const post = props.data.contentfulBlogPost
  return <SEOHead  title={post.title} description={post.excerpt.excerpt} image={post.image} />
}

export default function BlogPost(props) {
  const post = props.data.contentfulBlogPost

  return ( <Layout {...post} description={post.excerpt} location={props.location}>
    <Container style={{fontFamily: "Georgia, serif"}}>
      <Box paddingY={4}>
        <Kicker>{post.category}</Kicker>
        <Heading as="h1">{post.title}</Heading>
        <p className="blogPostDate" style={{position:"relative", top:-15}}>{post.date}</p>
        {post.image && (
          <GatsbyImage alt={post.image.alt} tile={post.image.alt} image={getImage(post.image)} />
        )}
        <div className="blogPost">
          {renderRichText(post.body, {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const asset = post.body.references.find(
                  (asset) => asset.contentful_id === node.data.target.sys.id
                )
                if (asset.gatsbyImageData === null) {
                  //not an image. Try parsing description (hack!) to get details to render
                  const desc = JSON.parse(asset.description)
                 
                  if (desc.type === "audio") {
                    return (
                    <AudioPlayer
                      autoPlay={false}
                      src={desc.url}
                      onPlay={e => console.log("onPlay")}
                      showJumpControls={false}
                      showDownloadProgress={true}
                      customAdditionalControls={[]}
                      layout="horizontal"

                  />)
                  } else {
                    //future: handle video
                    console.log("unknown type")
                    console.log(desc.type)
                  }
                } else {
                  return (
                    <GatsbyImage
                      alt={asset.description}
                      image={getImage(asset)}
                    />
                  )
                }
              },
              [INLINES.HYPERLINK]: (node, children) => {
                return <a target="_blank" rel="noopener noreferrer" href={node.data.uri}>{children}</a>
              }
            },
          })}
        </div>
      </Box>
    </Container>
  </Layout> 
)
}

export const query = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      slug
      title
      excerpt {
        excerpt
      }
      category
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData
            __typename
          }
        }
      }
      date(formatString:"MMMM Do, YYYY")
      image {
        id
        url
        gatsbyImageData
        alt
      }
    }
  }
`
