import React from 'react';
import './App.css';
import { QRCode } from 'react-qrcode-logo';
import * as VirusIcon from './assets/icon.png';

function App() {
  return (
    <div className='App'>
      <QRCode
        size={150}
        value='coronaVirus://patient0'
        logoImage={VirusIcon}
        logoHeight={50}
        logoWidth={50}
        quietZone={50}
        qrStyle='dots'
        ecLevel='H'
      />
    </div>
  );
}

export default App;
