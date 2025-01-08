import './RoomInfo.scss';
import PropTypes from 'prop-types';

export const RoomInfo = ({ roomLabel }) => (
  <div className="room-name-container">
    <h3 className="room-name">Room:</h3>
    <div className="room-name-divider">
      <h3 className="room-name-text">{roomLabel}</h3>
    </div>
  </div>
);

RoomInfo.propTypes = {
  roomLabel: PropTypes.string.isRequired,
};
