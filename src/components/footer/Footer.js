import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { GiWeightLiftingUp } from 'react-icons/gi';

function Footer({ color = '#1c2237', leagueId = '/empty' }) {

  return (
    <div className='footer-container' style={{ backgroundColor: color }}>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h3>Stay-fit</h3>
            <Link to='/'>Create you routine!</Link>
          </div>
          <div className='footer-link-items'>
            <h3>Sections</h3>
            <Link to={`/profile`}>My Profile</Link>
            <Link to={`/catalog`}>Catalog</Link>
            <Link to={`/routines`}>Weekly routine</Link>
          </div>
          <div className='footer-link-items'>
            <h3>Social</h3>
            <a target="_blank" href={`http://instagram.com}`}>Instagram</a>
            <a target="_blank" href={`http://facebook.com}`}>Facebook</a>
            <a target="_blank" href={`http://youtube.com}`}>Youtube</a>
            <a target="_blank" href={`http://twitter.com}`}>Twitter</a>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <GiWeightLiftingUp className='navbar-icon' />
              Stay-fit
            </Link>
          </div>
          <small className='website-rights'>Stay-fit © 2020</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
