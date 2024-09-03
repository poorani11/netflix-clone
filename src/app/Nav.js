import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, [])

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className="nav__contents">
        <img src="https://www.pngall.com/wp-content/uploads/13/Netflix-Logo-PNG.png" className="nav__logo" alt="netflix-logo" onClick={() => navigate("/")} />
        <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
          className="nav__avatar" alt="profile-icon" onClick={() => navigate("/profile")} />
      </div>
    </div>
  )
}

export default Nav;
