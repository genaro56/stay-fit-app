import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaBars, FaStripe, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useCurrentUser } from "../auth/CurrentUser";
import './Navbar.css';
import styled from 'styled-components';

const Svg = styled.svg.attrs(() => ({
  width: 50,
  height: 50,
  viewBox: '0 0 50px 50px',
  fill: '#FFFFFF',
  xmlns: 'http://www.w3.org/2000/svg',
}))``;


const GymWeight = ({ color }) => (
  <Svg>
    <path d="M50,300.05c-27.6,0-50,22.4-50,50v174c0,27.6,22.4,50,50,50s50-22.4,50-50v-174C100,322.45,77.6,300.05,50,300.05z" />
    <path d="M690.1,244.55c-27.6,0-50,22.4-50,50v102.5h-406v-102.5c0-27.6-22.4-50-50-50c-27.6,0-50,22.4-50,50v285
			c0,27.6,22.4,50,50,50c27.6,0,50-22.4,50-50v-102.5h406v102.5c0,27.6,22.4,50,50,50s50-22.4,50-50v-285
			C740.1,266.95,717.699,244.55,690.1,244.55z"/>
    <path d="M824.1,300.05c-27.6,0-50,22.4-50,50v174c0,27.6,22.4,50,50,50s50-22.4,50-50v-174
			C874.1,322.45,851.699,300.05,824.1,300.05z"/>
  </Svg>
);


function Navbar({ color = '#1c2237' }) {
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
              <GymWeight className='navbar-icon' />
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