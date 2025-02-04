import { useState } from 'react';
import Page from '../../components/Page';
import TimeStamp from '../../components/TimeStamp';
import Content from '../../components/Content';
import './kiosk.scss';
import KioskError from './KioskError';
import { Link } from 'react-router-dom';

function Kiosk({ deviceId }) {
  const [errorState, setErrorState] = useState(null);

  const errorStates = {
    sessionNotFound: {
      title: 'Session Not Found',
      message:
        'We are unable to find this session. Please visit Registration Services to assist you with finding the correct session.',
    },
    printerError: {
      title: 'Printer Error',
      message:
        'We are currently unable to print your badge at this kiosk. Please visit Registration Services to assist you with printing out your badge. Sorry for any inconvenience as we work to resolve this issue.',
    },
  };

  return (
    <Page>
      <TimeStamp />
      <Content>
        {errorState && (
          <KioskError
            title={errorStates[errorState].title}
            message={errorStates[errorState].message}
          />
        )}
        <div className="qr-button">
          <Link to="/find-session" className="get-started-button">
            Get Started
          </Link>
        </div>
      </Content>
    </Page>
  );
}

export default Kiosk;
