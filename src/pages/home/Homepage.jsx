import React from 'react'
import Mainlayout from '../../components/Mainlayout'
import Hero from '../container/Hero'
import Ariticles from '../container/Ariticles';
import CTA from '../container/CTA'

function Homepage() {
  return (
    <Mainlayout>
      <Hero/>
      <Ariticles/>
      <CTA/>
    </Mainlayout>
  )
;}

export default Homepage;



