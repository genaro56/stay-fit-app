import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaAutoprefixer, FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useCurrentUser } from "../pages/auth/CurrentUser";
import './Navbar.css';

function Navbar({ leagueId = '', color = '#1c2237'}) {
  const currentUser = useCurrentUser()  
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar' style={{ backgroundColor: color }}>
          <div className='navbar-container container'>
            <Link                   to={`/${leagueId}`} className='navbar-logo' onClick={closeMobileMenu}>
              <FaAutoprefixer className='navbar-icon' />
              Stay-fit
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul style={{ backgroundColor: color }} className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to={`/${leagueId}/news`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Noticias
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/${leagueId}/regulation`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Reglamento
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/${leagueId}/media`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Multimedia
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/${leagueId}/about`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/${leagueId}/sponsors`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Patrocinadores
                </Link>
              </li>
              {currentUser &&
              <li className='nav-item'>
                <Link
                  to={`/league/${currentUser.leagueId}/signup`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Mi Equipo
                </Link>
              </li>
              }            
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;