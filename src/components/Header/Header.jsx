// Header.jsx
import React from 'react';
import './Header.css';

const Header = ({ setIsHeaderVisible }) => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('exploreMenu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsHeaderVisible(false); // Hide the header
  };

  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order Your Favourite Food</h2>
        <p>
          "Why wait in line when your favorite meals can find their way to your door? ..."
        </p>
        <button onClick={scrollToMenu}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
