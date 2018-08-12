import * as React from 'react'
import { Link } from 'react-router-dom'
import logo from '../_assets/logo.svg'

import { Content } from '+dumb/Layouts'
import { Helper } from '+dumb/Headers'

import styles from '../styles.scss'

const Presenter = () => (
  <div className={styles.page}>
    <h1>So you think you can host</h1>
    <Helper>Great. Here's how.</Helper>

    <Content title="Step 1: Little Narrative, Big Party">
      <p>Pick <Link to="/parties/new">a narrative</Link> and create a new party (unlike actors, you will have to <Link to="/login">create an account</Link>). You can always edit the logistics later, <strong>but you can't change the characters</strong>. Assign a girl to a guy's role, or assign two to one role if you're feeling edgy, but unless all characters have actors, you're going to have a bad time.</p>
    </Content>

    <Content title="Step 2: Invite">
      <p>After reading through the character descriptions, type in the name of your friend and copy the link to send them. Email, text, Instagram message, Telegram, Twitter DM, AIM, Gchat, WhatsApp, Signal, Facebook Messenger, Hipchat, Slack, I don't care.</p>
      <p>Just make sure it is <strong>sent privately</strong>. To play Murder with Friends, you do not need an account. So anyone with a character link can see the clues, the instructions, and the notes from that party. Encourage your guests to guard their link carefully.</p>
      <p>You can assign yourself a character, that's cool.</p>
    </Content>

    <Content title="Step 3: Prep">
      <p>Plan for your space at a bar or make it a potluck. The location isn't as important as the involvement.</p>

      <p>Actors should build their backstory and fill out their character's prompts to get in the zone. They should wear clothes that match their role. They should reach out to their significant others and coordinate coming at the same time.</p>
      </Content>

    <Content title="Step 4: Play">
      <p>Don't break character. Take time for each round (<em>suggested 20 minutes per round</em>). Don't rush; even if everyone's done with their instructions, wait a minute to let it breathe. This is a party, not a sprint.</p>

      <p>Feel free to walk around and use the whole space. This isn't a sit-at-the-table kind of game. In fact, it's better if you have side conversations and actors seeking out other actors away from the group. No one has the full puzzle, but everyone will have enough information to determine whodunit.</p>

      <p>Before Round 4, take a <strong>vote for the murderer</strong>. Actors can either take turns announcing their suspect and rationale or you can take an anonymous ballot. I prefer the former, but you do you.</p>
    </Content>

    <Link to="/">
      <img src={logo} alt="Murder with Friends" />
    </Link>
  </div>
);

export default Presenter;
