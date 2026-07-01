import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function About(props) {
  const { homepage } = props.data
  return (
    <Layout location={props.location}>
       <div>
            {homepage.blocks.map((block) => {
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
      title="About Marc Cull | Product & Engineering Leader"
      description="About Marc Cull — a product engineering leader (CPTO, CTO, VP Engineering) focused on building high-performing teams and systems for rapidly scaling startups."
      image={homepage.image}
      pathname="/about/"
      includePerson
    />
  )
}
export const query = graphql`
{
  homepage(title: { eq: "About Me"}) {
    id
    title
    description
    image {
      id
      url
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