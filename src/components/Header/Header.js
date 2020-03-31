import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
const Header = () => {
    
    return (
        <div className="header">
            <Link to="/" style={{"textDecoration":"none","color":"white"}}>
            <img src="compass.png" height="50"/>
            <span className="none invis" >FINDING FALCONE</span>
            </Link>
            
            </div>
    )
};

export default Header;