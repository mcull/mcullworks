import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import { VisuallyHidden } from "../components/ui"

export default function Homepage(props) {
  const { homepage } = props.data

  return (
      <Layout location={props.location}>
      <VisuallyHidden as="h1">
        Marc Cull — Product &amp; Engineering Leader (CPTO, CTO, VP Engineering)
      </VisuallyHidden>
      <div className="homepageContent" >
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
      title="Marc Cull | Product & Engineering Leader — CPTO, CTO, VP Engineering"
      description="Marc Cull is a product engineering leader (CPTO, CTO, VP Engineering) who builds high-performing teams and systems for rapidly scaling startups — specializing in talent discovery, team structure, and fast product delivery."
      image={homepage.image}
      pathname="/"
      includePerson
    />
  )
}
export const query = graphql`
   {
    homepage(title: { eq: "mcull.works"}) {
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
  }
`
