import * as React from "react"
import "../styles.css"
import { Slice } from "gatsby"

const Layout = ({ children, location }) => {
  return (
    <>
     <Slice alias="header" isHome={location && location.pathname === '/'}/>
      {children}
      <Slice alias="footer" isHome={location && location.pathname === '/'}/>
    </>
  )
}

export default Layout
