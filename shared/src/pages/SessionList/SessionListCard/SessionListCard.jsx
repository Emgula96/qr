import './session-list-card.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDeviceManager } from '../../Playground/useDeviceManager';
const SessionListCard = ({
  name,
  email,
  sessionTitle,
  room,
  deviceId
}) => {
  const { isLoaded, isInitialized, initializeDeviceManager, printBadge } = useDeviceManager();

  useEffect(() => {
    if (isLoaded && !isInitialized) {
      initializeDeviceManager()
        .catch(error => console.error('Failed to initialize device manager:', error));
    }
  }, [isLoaded, isInitialized, initializeDeviceManager]);

  const handlePrintBadge = async () => {
    const badgeContent = `
      <RC410,10><RTF1,12><SD1>${name}<RL>
      <RC410,40><RTF1,10><SD1>${email}<RL>
      <RC410,70><RTF1,10><SD1>${sessionTitle}<RL>
      <RC410,100><RTF1,10><SD1>${room}<RL>
    `;
    
    try {
      await printBadge(deviceId, badgeContent);
      console.log('Print successful');
    } catch (error) {
      console.error('Failed to print badge:', error);
    }
  };

  console.log('deviceId', deviceId);
  console.log('name', name);
  console.log('email', email);
  console.log('sessionTitle', sessionTitle);
  console.log('room', room);

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
      {/* TODO: Add deviceId to the button so that it can be used print to correct device */}
      <div className="button-container">
        <button className="print-badge-button" onClick={handlePrintBadge}>
          Print Badge
        </button>
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
