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
      // Format the QR data string in the required format
      const qrString = `userId=${email},sessionId=826`;
      
      // Create badge content with properly formatted QR code
      const badgeContent = `
        <QRV6>
        <RC150,150><QR6>${qrString}
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
