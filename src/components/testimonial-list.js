import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  Heading,
  Kicker,
  Flex,
  Box,
  FlexList,
  Blockquote,
  Text,
  Avatar,
} from "./ui"

function Testimonial(props) {
  return (
    <Flex variant="start">
      {false && props.avatar && (
        <Avatar alt={props.avatar.alt} image={props.avatar.gatsbyImageData} />
      )}
      <Blockquote>
      <figcaption>
          <Text as="cite" bold variant="caps">
            {props.source}
          </Text>
        </figcaption>
        <Text as="p" variant="lead">
        &ldquo;{props.quote}&rdquo;
        </Text>
      </Blockquote>
    </Flex>
  )
}

export default function TestimonialList(props) {
  return (
    <Section>
      <Container>
        <Box center>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
          <Text as="p" variant="subheadSmall">{props.subhead}</Text>
        </Box>
        <FlexList gutter={3} variant="start" responsive wrap>
          {props.content.map((testimonial, index) => (
            <Box as="li" key={testimonial.id + index} width="half" padding={3}>
              <Testimonial {...testimonial} />
            </Box>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageTestimonialListContent on HomepageTestimonialList {
    id
    kicker
    heading
    subhead
    content {
      id
      quote
      source
      avatar {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
