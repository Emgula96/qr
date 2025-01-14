import './session-list-card.scss';
import PropTypes from 'prop-types';
const SessionListCard = ({
  name,
  email,
  label,
  room,
}) => {
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
        <span className="value">{label}</span>
      </div>

      <div className="info-item">
        <span className="label">Location:</span>
        <span className="value">{room}</span>
      </div>

      <div className="button-container">
        <button className="print-badge-button">Print Badge</button>
      </div>
    </div>
  );
};

SessionListCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default SessionListCard;
