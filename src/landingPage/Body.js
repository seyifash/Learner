import React from 'react';
import Navbar2 from "./LandingNavBar";
import Home from './home';
import Footer1 from './Footer';
import './home.css';
import './Body.css';


const Body = () => {
    return (
        <div className="all">
            <Navbar2 />
            <Home />
            <Footer1 />
        </div>
    )
}
export default Body;