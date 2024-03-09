import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import * as styles from "./blog-post.css"
import SEOHead from "../components/head"
import {
  Container,
  FlexList,
  Box,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../components/ui"

function PostCard({
  slug,
  image,
  title,
  excerpt,
  author,
  category,
  date,
  ...props
}) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={image.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
      <Text as="p" className="blogPostDate">{date}</Text>
      <Text as="p">{excerpt.excerpt}</Text>
      {author?.name && (
        <Text variant="bold">
          <div>By {author.name}</div>
        </Text>
      )}
    </BlockLink>
  )
}

function PostCardSmall({
  slug,
  image,
  title,
  category,
  ...props
}) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={image.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
    </BlockLink>
  )
}

export default function BlogIndex(props) {
  const posts = props.data.allContentfulBlogPost.nodes
  return (
    <Layout>
      <Container>
        <Box paddingY={4}>
          <FlexList variant="start" gap={0} gutter={3} responsive>
            {posts.map((post) => (
              <Box as="li" key={post.id} padding={3} width="half">
                <PostCard {...post} />
              </Box>
            ))}
          </FlexList>
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost {
      nodes {
        id
        slug
        title
        excerpt {
          excerpt
        }
        category
        date(formatString:"MMMM Do, YYYY, h:mm a")
        image {
          id
          alt
          gatsbyImageData
        }
      }
    }
  }
`
