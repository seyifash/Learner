import React from 'react';
import Teacherpics from '../../assets/teacher-about.jpg';
import './About.css';

const AboutSection = () => {
  return (
    <div>
        <section id="about-head" class="section-p1">
            <div class="about-text">
                <h1>Who We Are?</h1>
                <h2>We,re on a mission to make life easy for both students and teachers world wide</h2>
                <p>"t.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa it.
            </p>
            </div>
        </section>
         <section class="descriptive-pics">
            <div class="contains-image">
                <img src={Teacherpics} alt="teacher"/>
            </div>
            <span class="span-it">
                #Connect with your students from anywhere around the world.
            </span>
        </section>
        <section class="about-details">
            <div class="vision">
                <h1>We provide teachers with a platform to blah</h1>
                <p>our website helps to facilate easy Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa.
                    .
                </p>
            </div>
            <div class="values">
                <h1>We provide teachers with a platform to blah</h1>
                <p>our website helps to facilate easy Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa.
                </p>
            </div>
            <div class="div-button">Get Started</div>
        </section>
    </div>
  )
}

export default AboutSection