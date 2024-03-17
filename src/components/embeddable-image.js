import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"

export default function EmbedableImage(props) {
  return (
    <GatsbyImage
    alt={props.image.alt}
    image={getImage(props.image.gatsbyImageData)}
    placehoder="blurred"
    />
  )
}

export const query = graphql`
  fragment EmbeddableImageContent on EmbeddableImage {
    image {
      id
      gatsbyImageData
      alt
    }
  }
`