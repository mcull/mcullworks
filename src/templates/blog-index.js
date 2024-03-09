import * as React from "react"
import { graphql } from "gatsby"
import { DateTime } from "luxon"
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

const DATEFORMAT = "MMMM dd, yyyy, h:mm a"

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
      <Text as="p" className="blogPostDate">{DateTime.fromFormat(date, DATEFORMAT).toLocaleString(DateTime.DATE_FULL)}</Text>
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
  console.log(posts[0].date)
  
  posts.sort((a, b) => { 
    const aDate = DateTime.fromFormat(a.date, DATEFORMAT)
    const bDate = DateTime.fromFormat(b.date, DATEFORMAT)
    console.log(aDate)
    return bDate.toUnixInteger() - aDate.toUnixInteger() })
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
        date(formatString:"MMMM DD, YYYY, h:mm a")
        image {
          id
          alt
          gatsbyImageData
        }
      }
    }
  }
`
