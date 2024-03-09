import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { Container, Heading, Box } from "../components/ui"

export default function BlogPost(props) {
  const post = props.data.contentfulBlogPost
  return ( <Layout {...post} description={post.excerpt}>
    <Container>
      <Box paddingY={4}>
        {post.image && (
          <GatsbyImage alt={post.image.alt} image={getImage(post.image)} />
        )}
        <Heading as="h1">{post.title}</Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />
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
      excerpt
      html
      date
      image {
        id
        url
        gatsbyImageData
        alt
      }
    }
  }
`