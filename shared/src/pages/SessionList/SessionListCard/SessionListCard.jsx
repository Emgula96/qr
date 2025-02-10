import './session-list-card.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDeviceManager } from '../../Playground/useDeviceManager';
import PrintStatus from './PrintStatus';

const SessionListCard = ({
  name,
  email,
  event
}) => {
  const { isLoaded, isInitialized, initializeDeviceManager, printTicket } = useDeviceManager();
  const [printStatus, setPrintStatus] = useState(null);

  useEffect(() => {
    if (isLoaded && !isInitialized) {
      initializeDeviceManager()
        .catch(error => console.error('Failed to initialize device manager:', error));
    }
  }, [isLoaded, isInitialized, initializeDeviceManager]);

  const handlePrintBadge = async () => { 
    try {     
      const badgeContent = `
   <RC10,10><F2><SD1><RC60,10><F9><SD1><RC110,10><F3><SD1><RC160,10><F11><SD1><RC210,10><F10><SD1><RC260,10><F6><SD1><RC310,10><F12><SD1><RC410,10><RTF1,12><RR>
   <RC250,1670><F12><SD1>${name}
      <RC250,1580><F6><SD1>Room : ${event.event_dates[0].room?.name}
      <RC250,1530><SD1>${event.sub_title} - ${event.id}
      <QRV7><RC300,1440><QR8,1,0,0>
      {userId~061${email}~044sessionId~061${event.id}}
      `;
      const status = await printTicket(badgeContent);
      setPrintStatus(status);
      console.log('Print status:', status);
    } catch (error) {
      console.error('Error printing badge:', error);
    }
  };

  return (
    <div className="session-info-card">
      {printStatus ? (
        <PrintStatus 
          status={printStatus} 
          onTryAgain={() => setPrintStatus(null)}
        />
      ) : (
        <>
          <h2>Session Information</h2>
          <p className="review-text">Review information below for accuracy.</p>

          <div className="info-item">
            <span className="label">Session Title:</span>
            <span className="value">{event.sub_title}</span>
          </div>
          
          <div className="info-item">
            <span className="label">Location:</span>
            <span className="value">{event.event_dates[0].room?.name}</span>
          </div>

          <div className="info-item">
            <span className="label">Start Time:</span>
            <span className="value">{event.event_dates[0].start_time}</span>
          </div>

          <div className="info-item">
            <span className="label">E-mail:</span>
            <span className="value">{email}</span>
          </div>


          <div className="button-container">
            <button className="print-badge-button" onClick={handlePrintBadge}>
              Print Badge
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SessionListCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sub_title: PropTypes.string.isRequired,
    event_dates: PropTypes.arrayOf(
      PropTypes.shape({
        room: PropTypes.shape({
          name: PropTypes.string
        })
      })
    ).isRequired
  }).isRequired
};

export default SessionListCard;