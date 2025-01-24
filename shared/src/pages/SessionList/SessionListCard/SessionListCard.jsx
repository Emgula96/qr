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
  const { isLoaded, isInitialized, initializeDeviceManager, printTicket } = useDeviceManager();

  useEffect(() => {
    if (isLoaded && !isInitialized) {
      initializeDeviceManager()
        .catch(error => console.error('Failed to initialize device manager:', error));
    }
  }, [isLoaded, isInitialized, initializeDeviceManager]);

  const badgeContent = `
      <RC410,10><RTF1,12><SD1> <RL>
      <RC640,200><RTF1,12><SD1>${name}<RU>
      <RC410,10><RTF1,12><SD1> <RL>
    <RC440,400><RTF1,10><SD1>${sessionTitle}<RL>
    <RC410,10><RTF1,12><SD1> <RL>
    <RC440,600><RTF1,10><SD1>${room}<RL>
  `;

  const handlePrintBadge = () => {
    console.log('badgeContent', badgeContent);
    console.log('name', name);
    console.log('sessionTitle', sessionTitle);
    console.log('room', room);
    printTicket(badgeContent);
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
