import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Blog App</h1>
            <div className='navbar_content'>
                <Link to="/">Home</Link>
                <Link to="/content">Content</Link>
                <Link to="/file-upload">File Upload</Link>
            </div>
        </nav>
    );
};

export default Navbar;