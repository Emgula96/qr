import './session-list-card.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDeviceManager } from '../../Playground/useDeviceManager';

const SessionListCard = ({
  name,
  email,
  sessionTitle,
  room,
  sessionId,
}) => {
  const { isLoaded, isInitialized, initializeDeviceManager, printTicket } = useDeviceManager();

  useEffect(() => {
    if (isLoaded && !isInitialized) {
      initializeDeviceManager()
        .catch(error => console.error('Failed to initialize device manager:', error));
    }
  }, [isLoaded, isInitialized, initializeDeviceManager]);

  const handlePrintBadge = async () => {
    // <RC640,200><RTF1,12><SD1>${name}<RU>
    // <RC640,230><RTF1,10><SD1>${sessionTitle} - ${sessionId}<RU>
    // <RC640,260><RTF1,10><SD1>${room}<RU>
   
    try {     
      // Create badge content with properly formatted QR code
      const badgeContent = `
       // <QRV7><RC300,1300><QR8,1,0,0>
      {userId~061${email}~044sessionId~061${sessionId}}
      `;

      console.log('badgeContent', badgeContent);
      await printTicket(badgeContent);
    } catch (error) {
      console.error('Error printing badge:', error);
    }
  };

  return (
    <div className="session-info-card">
      <h2>Session Information</h2>
      <p className="review-text">Review information below for accuracy.</p>

      <div className="info-item">
        <span className="label">Name:</span>
        <span className="value">{name}</span>
      </div>

      <div className="info-item">
        <span className="label">E-mail:</span>
        <span className="value">{email}</span>
      </div>

      <div className="info-item">
        <span className="label">Session Title:</span>
        <span className="value">{sessionTitle}</span>
      </div>

      <div className="info-item">
        <span className="label">Location:</span>
        <span className="value">{room}</span>
      </div>

      <div className="button-container">
        <button onClick={handlePrintBadge}>Print Badge</button>
      </div>
    </div>
  );
};

SessionListCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  sessionTitle: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
};

export default SessionListCard;
