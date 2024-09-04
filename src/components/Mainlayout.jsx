import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Mainlayout({children}) {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}

export default Mainlayout