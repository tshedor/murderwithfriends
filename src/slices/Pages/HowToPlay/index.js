import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../_assets/logo.svg'
import { Content } from '+dumb/Layouts'
import styles from '../styles.scss'
import { Helper } from '+dumb/Headers'

const Presenter = () => (
  <div className={styles.page}>
    <h1>So you're popular</h1>
    <Helper>Lucky you, getting invited to a murder mystery party.</Helper>

    <Content title="What is this?">
      <p>This is a murder mystery party. Everyone is a character in a themed story. You're working together to figure out who's the murderer, one round at a time. You'll receive clues, instructions, and information about your character along the way. You won't have all information, but <strong>you can figure it out with the information you have by the end of Round 3</strong>. I believe in you.</p>

      <p>You have most likely received a link to your character profile. <strong>Do not share this link with anyone</strong>. You don't have to log in or create an account to play, so anyone with your link can see your clues.</p>
    </Content>

    <Content title="Get Into It">
      <p>If you do nothing else, be a team player. Indulge your character. Ham it up. Create a backstory. Dress the part. Answer your questions before you arrive. Get to know your spouse if you have one. Create fake memories. Live someone else's life, if only for two hours. These things work best when everyone plays along.</p>
    </Content>

    <Content title="Follow Directions">
      <p>Every round you'll have instructions. <strong>Complete these instructions</strong> and <strong>pick up clues when they're listed</strong>. You will have valuable information that helps or hurts other players; if you don't reveal this, you're ruining someone else's party. Don't worry, these are not huge asks and they're usually very easy.</p>

      <p><strong>Do not falsify your information unless instructed</strong>.</p>
    </Content>

    <Link to="/">
      <img src={logo} alt="Murder with Friends" />
    </Link>
  </div>
);

export default Presenter;
