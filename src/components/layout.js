import * as React from "react"
import "../styles.css"
import { Slice } from "gatsby"

const Layout = ({ children, location }) => {
  return (
    <>
     <Slice alias="header" x={true}/>
      {children}
      <Slice alias="footer" />
    </>
  )
}

export default Layout
