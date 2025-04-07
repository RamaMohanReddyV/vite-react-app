import React, { useState } from 'react';
import '../CSS/navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Nav = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    setMenu("home");
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchTerm('');
    const resetSearchEvent = new CustomEvent("search-items", { detail: "" });
    window.dispatchEvent(resetSearchEvent);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const term = searchTerm.trim().toLowerCase();
      const searchEvent = new CustomEvent("search-items", { detail: term });
      window.dispatchEvent(searchEvent);
      setShowSearch(false); // Optional: close search box after submit
    }
  };

  return (
    <div className='navbar'>
      <img
        src={assets.logo}
        className="logo"
        onClick={handleHomeClick}
        style={{ cursor: "pointer" }}
      />

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <a onClick={handleHomeClick} className={menu === "home" ? "active" : ""}>home</a>
        <a href='#exploreMenu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
      </ul>

      <div className='navbar-right'>
        <img
          src={assets.search_icon}
          alt="search"
          onClick={toggleSearch}
          style={{ cursor: 'pointer' }}
        />
        {showSearch && (
          <input
            type="text"
            className="search-input"
            placeholder="Yummy🤤🤤🤤🤤🤤....,"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        )}

        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className="dot"></div>
        </div>
      </div>

      <button onClick={() => setShowLogin(true)}>sign in</button>
    </div>
  );
};

export default Nav;
