import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { GiWeightLiftingUp } from 'react-icons/gi';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaAutoprefixer
} from 'react-icons/fa';

// TODO: Cambiar links
function Footer({ color = '#1c2237', leagueId = '/empty'}) {
  // const [data, loading] = useDocumentData(LeagueInfoCollection.doc(leagueId))

  return (
    <div className='footer-container' style={{ backgroundColor: color }}>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h3>Stay-fit</h3>
            <Link to='/'>Crea tu rutina</Link>
          </div>
          <div className='footer-link-items'>
            <h3>Secciones</h3>
            <Link to={`/`}>Mi perfil</Link>
            <Link to={`/`}>Catálogo</Link>
            <Link to={`/`}>Mi rutina semanal</Link>
          </div>
          <div className='footer-link-items'>
            <h3>Redes</h3>
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
