import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const DashboardItem = ({ id, icon, name, link, handleLogout, activeItem, handleMouseOver, handleLinkClick }) => {
    return (
        link === '/logout' ? (
            <li onMouseOver={() => handleMouseOver(id)} className={activeItem === id ? 'hovered' : ''} onClick={handleLogout}>
                <Link to={link} onClick={handleLinkClick} >
                    <span className="icon">{icon}</span>
                    <span className="title">{name}</span>
                </Link>
            </li>
        ) : (
            <li onMouseOver={() => handleMouseOver(id)} className={activeItem === id ? 'hovered' : ''}>
                <Link to={link} onClick={handleLinkClick}>
                    <span className="icon">{icon}</span>
                    <span className="title">{name}</span>
                </Link>
            </li>
        )
    );
};

DashboardItem.propTypes = {
    id: PropTypes.number,
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    handleLogout: PropTypes.func,
    activeItem: PropTypes.number,
    handleMouseOver: PropTypes.func.isRequired,
    handleLinkClick: PropTypes.func.isRequired, 
};

export default DashboardItem;
