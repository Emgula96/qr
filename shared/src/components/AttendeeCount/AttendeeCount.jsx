import PropTypes from 'prop-types';

export function AttendeeCount({ checkedInCount, capacity, isSessionFull }) {
  return (
    <div className="attendee-container">
      <h2>Attendee Count</h2>
      <div className="count">
        <p>
          {isSessionFull
            ? 'Session at Capacity'
            : `${checkedInCount} / ${capacity}`}
        </p>
      </div>
    </div>
  );
}

AttendeeCount.propTypes = {
  checkedInCount: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  isSessionFull: PropTypes.bool.isRequired,
};
