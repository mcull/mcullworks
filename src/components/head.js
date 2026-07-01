import * as React from "react"

const SITE_URL = "https://mcull.works"
const NAME = "Marc Cull"

const DEFAULT_TITLE =
  "Marc Cull | Product & Engineering Leader — CPTO, CTO, VP Engineering"
const DEFAULT_DESCRIPTION =
  "Marc Cull is a product engineering leader (CPTO, CTO, VP Engineering) who builds high-performing teams and systems for rapidly scaling startups — specializing in talent discovery, team structure, and fast product delivery."
const DEFAULT_IMAGE = `${SITE_URL}/marc.png`

// Social profiles — used for the Person schema `sameAs` (helps Google
// connect this site to the "Marc Cull" entity for name searches).
const SAME_AS = [
  "https://www.linkedin.com/in/mcull",
  "https://github.com/mcull",
  "https://twitter.com/marccull",
  "https://www.instagram.com/marccull",
]

function buildTitle(title) {
  if (!title || title === "mcull.works") return DEFAULT_TITLE
  return title.includes(NAME) ? title : `${title} | ${NAME}`
}

export default function Head({
  title,
  description,
  image,
  pathname,
  includePerson = false,
  article,
}) {
  const metaTitle = buildTitle(title)
  const metaDescription = description || DEFAULT_DESCRIPTION
  const imageUrl = (image && image.url) || DEFAULT_IMAGE
  const canonical = `${SITE_URL}${pathname || "/"}`
  const ogType = article ? "article" : "website"

  const structuredData = []

  if (includePerson) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "Person",
      name: NAME,
      url: SITE_URL,
      image: DEFAULT_IMAGE,
      jobTitle: "Product & Engineering Leader (CPTO / CTO / VP Engineering)",
      description: DEFAULT_DESCRIPTION,
      sameAs: SAME_AS,
    })
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: NAME,
      url: SITE_URL,
    })
  }

  if (article) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: metaDescription,
      image: imageUrl,
      url: canonical,
      mainEntityOfPage: canonical,
      author: { "@type": "Person", name: NAME, url: SITE_URL },
      publisher: { "@type": "Person", name: NAME, url: SITE_URL },
      ...(article.datePublished
        ? { datePublished: article.datePublished }
        : {}),
    })
  }

  return (
    <>
      <meta charSet="utf-8" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={NAME} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@marccull" />

      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
}
