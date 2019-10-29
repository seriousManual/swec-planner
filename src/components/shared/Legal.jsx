import React from 'react';

const Legal = () => (
  <div>
    <p className="legal">
      <a href="https://www.methodpark.com/overview/imprint.html" target="_blank" rel="noopener noreferrer">Legal Notice</a>
      {' '}|{' '}
      <a href="https://www.methodpark.com/overview/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
    </p>

    <div id="sponsors">
      <a href="https://www.methodpark.de"><img src="/sponsors/mp.png" alt="Method Park"/></a>

      <div>
        <a href="https://www.datev.de"><img src="/sponsors/datev.jpg" alt="datev"/></a>
        <a href="https://www.innoq.com/de/"><img src="/sponsors/innoq.jpg" alt="INNOQ"/></a>
        <a href="https://www.jetbrains.com/"><img src="/sponsors/jetbrains.png" alt="jetbrains"/></a>
      </div>

      <div>
        <a href="https://www.restaurant-frau-b.de/"><img src="/sponsors/fraub.png" alt="Frau B. Food and Flavour Eventcatering" /></a>
        <a href="https://www.specialeventservice.de/"><img src="/sponsors/ses.jpg" alt="SES special event service"/></a>
      </div>
    </div>
  </div>
);

export default Legal;