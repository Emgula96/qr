import './session-list-card.scss';
import PropTypes from 'prop-types';
const SessionListCard = ({
  name,
  email,
  sessionTitle,
  room,
  deviceId
}) => {
  console.log('deviceId', deviceId);
  console.log('name', name);
  console.log('email', email);
  console.log('sessionTitle', sessionTitle);
  console.log('room', room);
  
  const handlePrintBadge = () => {
    // Format the badge content using FGL (Format Generation Language)
    const badgeContent = `
      <RC410,10><RTF1,12><SD1>${name}<RL>
      <RC410,40><RTF1,10><SD1>${email}<RL>
      <RC410,70><RTF1,10><SD1>${sessionTitle}<RL>
      <RC410,100><RTF1,10><SD1>${room}<RL>
    `;
    
    console.log('Printing badge with content:', badgeContent);

    // Check if DeviceManager is available
    if (window.LWDeviceManager) {
      window.LWDeviceManager.TicketPrinter_PrintTicket(
        deviceId,
        "TicketPrinter_Gen2.Boca.Lemur",
        badgeContent,
        true,
        (res) => {
          console.log('Print successful:', res);
        },
        () => {
          console.error('Failed to print badge');
        }
      );
    } else {
      console.error('Device Manager not available');
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
