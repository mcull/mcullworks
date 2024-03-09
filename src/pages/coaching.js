import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import { InlineWidget } from "react-calendly";

export default function Coaching (props) { 
    const { homepage } = props.data 
    return (
        <Layout>
        <div >
            {homepage.blocks.map((block) => {
            const { id, blocktype, ...componentProps } = block
            const Component = sections[blocktype] || Fallback
            return <Component key={id} {...componentProps} />
            })}
        </div>
        <div>
          <a name="schedule" />
          <InlineWidget url="https://calendly.com/mcull/coaching-intro" />
        </div>
        </Layout>
    )
}

export const query = graphql`
  {
    homepage(title: { eq: "Coaching"}) {
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