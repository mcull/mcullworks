import * as React from "react"

export default function Head({ title, description, image }) {
  return (
    <>
      <meta charSet="utf-8" />
      <title>{title}</title>
      {description && (
        <meta
          name="description"
          property="og:description"
          content={description}
        />
      )}
      <meta property="og:title" content={title} />
      {image && <meta property="og:image" content={image.url} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image.url} />}
      <script type="application/ld+json" id="oada_ma_toolbar_script"> {`
        var oada_ma_license_key="SenJyTE127LcFedXEhORoKJ3Q4cGw4NTmEfthYdh0VxY1BME64";var oada_ma_license_url="https://api.maxaccess.io/scripts/toolbar/SenJyTE127LcFedXEhORoKJ3Q4cGw4NTmEfthYdh0VxY1BME64";(function(s,o,g){a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.src=g;a.setAttribute("async","");a.setAttribute("type","text/javascript");a.setAttribute("crossorigin","anonymous");m.parentNode.insertBefore(a,m)})(document,"script",oada_ma_license_url+oada_ma_license_key)
        `}
      </script>
    </>
  )
}
