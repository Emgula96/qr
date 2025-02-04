import './session-list-card.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
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
    try {     
      // Create badge content with properly formatted QR code
      //fgl formatting found in confluence docs
      const badgeContent = `
   <RC10,10><F2><SD1><RC60,10><F9><SD1><RC110,10><F3><SD1><RC160,10><F11><SD1><RC210,10><F10><SD1><RC260,10><F6><SD1><RC310,10><F12><SD1><RC410,10><RTF1,12><RR>
   <RC250,1670><F12><SD1>${name}
      <RC250,1580><F6><SD1>Room : ${room}
      <RC250,1530><SD1>${sessionTitle} - ${sessionId}
      <QRV7><RC300,1440><QR8,1,0,0>
      {userId~061${email}~044sessionId~061${sessionId}}
      `;
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
        <button className="print-badge-button" onClick={handlePrintBadge}>
          Print Badge
        </button>
      </div>
    </div>
  );
};

SessionListCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  sessionTitle: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  sessionId: PropTypes.number.isRequired,
};

export default SessionListCard;
