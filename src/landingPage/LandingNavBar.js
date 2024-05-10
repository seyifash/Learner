import React, { useState, useEffect } from "react";
import 'boxicons/css/boxicons.min.css';
import './navBar2.css';
import { Link } from "react-router-dom";

const Navbar2 = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleMenuClick = () => {
            setIsMenuOpen((prev) => !prev);
    };

    const bar = document.querySelector(".menu");
        if (bar) {
        bar.addEventListener("click", handleMenuClick);
    }

    const bar2 = document.querySelector(".close");
        if (bar2) {
            bar2.addEventListener("click", handleMenuClick);
    }

    return () => {
        if (bar) {
            bar.removeEventListener("click", handleMenuClick);
        }
        if (bar2) {
            bar2.removeEventListener("click", handleMenuClick);
        }
    };
    }, []);
    return (
        <div className="navBar">
            <section className={`header-container ${isMenuOpen ? "active1" : ""}`}>
            <span><Link to="/">Learners</Link></span>
                <nav className={`header-carrier ${isMenuOpen ? "active" : ""}`}>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/blog">Our Blog</Link></li>
                    </ul>
                    <div className="activity-container">
                        <div className="sign-in"><Link to="/sign-in">Sign In</Link></div>
                    </div>
                </nav>
                <div className="contain">
                    <div className={`menu ${isMenuOpen ? "menud" : ""}`}>
                        <i className="bx bx-menu"></i>
                    </div>
                    <div className={`close ${isMenuOpen ? "closed" : ""}`}>
                        <i className="bx bx-x"></i>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Navbar2;