import React, { useState } from 'react';
import { FaStripe, FaStripeS } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { ReactComponent as GymWeight } from '../../images/gym-weight.svg';
function NoAuthNavbar({ color = '#1c2237' }) {
  const [, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar' style={{ backgroundColor: color }}>
          <div className='navbar-container container'>
            <Link to={'/'} className='navbar-logo' onClick={closeMobileMenu}>
              <FaStripeS className='navbar-icon' />
              Stay-fit
            </Link>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NoAuthNavbar;