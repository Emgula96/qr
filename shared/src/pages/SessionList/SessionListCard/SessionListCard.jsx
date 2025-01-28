import './session-list-card.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDeviceManager } from '../../Playground/useDeviceManager';

const SessionListCard = ({
  name,
  email,
  sessionTitle,
  room,
  deviceId
}) => {
  const { isLoaded, isInitialized, initializeDeviceManager, printTicket } = useDeviceManager();

  useEffect(() => {
    if (isLoaded && !isInitialized) {
      initializeDeviceManager()
        .catch(error => console.error('Failed to initialize device manager:', error));
    }
  }, [isLoaded, isInitialized, initializeDeviceManager]);

  const handlePrintBadge = async () => {
    try {
      // Generate QR code data with all required information
      const qrData = {
        userId: email,
        sessionId: 859
      };
      // <RC100,100><QR6>{userId=ethan.gula@esc4.net, sessionId=859} 
      // <RC300,100><QR4>{userId=ethan.gula@esc4.net, sessionId=859} 
      // <RC150,150>with{}<QR8>{${JSON.stringify(qrData)}}
      // Create badge content with a single, properly formatted QR code
      const badgeContent = `
        <QRV7>
        <RC150,150><QR8>${JSON.stringify(qrData)}
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
  deviceId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  sessionTitle: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default SessionListCard;
