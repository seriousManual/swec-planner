import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Heart from 'react-icons/lib/fa/heart';

import Legal from './Legal';
import './Footer.less';

const OptionalLegal = () => (
  <Router>
    <Switch>
      <Route path="/screen" render={() => ''} />
      <Route component={Legal} />
    </Switch>
  </Router>
);

const Footer = () => (
  <footer>
    <p>Made with <span role="img" aria-label="love"><Heart className="love" /></span> by
      {' '}
      <a href="https://www.methodpark.de/mobileapps-webapps.html" target="_blank" rel="noopener noreferrer">
        <img src="/logo/mp.png" className="footer-logo-mp" alt="method park" />
        {' '}
        team mobile
        {' '}
      </a>
      for <a href="https://swe-camp.de/" target="_blank" rel="noopener noreferrer">SWEC</a>
    </p>
    <OptionalLegal />

    <div id="sponsors">
      <a href="https://www.methodpark.de"><img src="/sponsors/mp.png" alt="Method Park"/></a>

      <div>
        <a href="https://www.restaurant-frau-b.de/"><img src="/sponsors/fraub.png" alt="Frau B. Food and Flavour Eventcatering" /></a>
        <a href="https://www.datev.de"><img src="/sponsors/datev.jpg" alt="datev"/></a>
        <a href="https://www.innoq.com/de/"><img src="/sponsors/innoq.jpg" alt="INNOQ"/></a>
        <a href="https://www.jetbrains.com/"><img src="/sponsors/jetbrains.png" alt="jetbrains"/></a>
        <a href="https://www.specialeventservice.de/"><img src="/sponsors/ses.jpg" alt="SES special event service"/></a>
      </div>
    </div>
  </footer>
);

export default Footer;