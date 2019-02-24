import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../../assets/logo.svg'

const Presenter = () => (
  <section className="home-hero">
    <img src={logo} alt="Murder with Friends" />
    <div className="home-buttons">
      <Link to="/how-to-host" className="button">How to Host</Link>
      <Link to="/how-to-play" className="button">How to Play</Link>
    </div>
    <div className="home-buttons">
      <Link to="/login" className="button">Login</Link>
    </div>
  </section>
);

export default Presenter;
