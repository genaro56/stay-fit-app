import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaBars, FaStripe, FaTimes } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import './Navbar.css';


function Navbar({ color = '#1c2237' }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar' style={{ backgroundColor: color }}>
          <div className='navbar-container container'>
            <Link to={'/'} className='navbar-logo' onClick={closeMobileMenu}>
              <GiWeightLiftingUp className='navbar-icon' />
              Stay-fit
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul style={{ backgroundColor: color }} className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to={`/catalog`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Catalog
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/routines`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Routines
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/profile`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Mi Profile
                </Link>
              </li>
              <li className='nav-item'>
                <Link

                  className='nav-links'
                  onClick={() => {
                    closeMobileMenu()
                    auth.signOut()
                    window.location.replace(`/`)
                  }}
                >
                  <Button
                    variant="outline-light"
                  >
                   Logout
                    </Button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;