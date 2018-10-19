import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../_assets/logo.svg'
import styles from './styles.scss';
import Button from '+dumb/Button'

const Presenter = () => (
  <section className={styles.homeHero}>
    <img src={logo} alt="Murder with Friends" />
    <div className={styles.homeButtons}>
      <Button path="/how-to-host">How to Host</Button>
      <Button path="/how-to-play">How to Play</Button>
    </div>{/*
    <div className={styles.homeButtons}>
      <Button path="/login">Login</Button>
    </div>*/}
  </section>
);

export default Presenter;
