import React from 'react'
import Navbar2 from '../LandingNavBar';
import Footer2 from '../Footer/Footer2';
import AboutSection from './AboutSection'
import './abt.css'

const About = () => {
  return (
    <div className="abt">
      <Navbar2 />
      <AboutSection />
      <Footer2 />
    </div>
  )
}

export default About