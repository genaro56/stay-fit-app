import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaBars, FaStripe, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useCurrentUser } from "../pages/auth/CurrentUser";
import './Navbar.css';

function Navbar({ leagueId = '', color = '#1c2237' }) {
  const currentUser = useCurrentUser()
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar' style={{ backgroundColor: color }}>
          <div className='navbar-container container'>
            <Link to={'/'} className='navbar-logo' onClick={closeMobileMenu}>
              <FaStripe className='navbar-icon' />
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
                  Catalogo
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/routines`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Rutinas
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/profile`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Mi Perfil
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