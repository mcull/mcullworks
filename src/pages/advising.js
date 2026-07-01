import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SEOHead from "../components/head"

export default function Advising (props) { 
    const { homepage } = props.data 
    
    return (
        <Layout location={props.location}>
        <div >
            {homepage.blocks && homepage.blocks.map((block) => {
            const { id, blocktype, ...componentProps } = block
            const Component = sections[blocktype] || Fallback
            return <Component key={id} {...componentProps} />
            })}
        </div>
        </Layout>
    )
}

export const Head = (props) => {
  const { homepage } = props.data
  return (
    <SEOHead
      title="Advising with Marc Cull | Product & Engineering Leadership"
      description={
        (homepage && homepage.description) ||
        "Startup advising with Marc Cull — product and engineering leadership for founders building and scaling high-performing teams."
      }
      image={homepage && homepage.image}
      pathname="/advising/"
    />
  )
}

export const query = graphql`
  {
    homepage(title: { eq: "Advising"}) {
      id
      title
      description
      image {
        id
        url
        gatsbyImageData
      }
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
        ...HomepageFeatureListContent
        ...HomepageCtaContent
        ...HomepageLogoListContent
        ...HomepageTestimonialListContent
        ...HomepageBenefitListContent
        ...HomepageProductListContent
      }
    }
  }`