import { PropTypes } from 'prop-types';
import { useMemo } from 'react';
import { militaryToReadable } from '../../util/Functions/militaryToReadable';
import './SessionInfo.scss';

export const SessionInfo = ({ event }) => {
  const sessionStartTime = useMemo(
    () => militaryToReadable(event?.event_dates[0]?.start_time),
    [event]
  );

  return (
    <div className="session-info">
      <h1 className="large-text">{event?.title}</h1>
      <p className="large-text">Session begins at {sessionStartTime} (CST)</p>
      <h2 className="large-text">Session Information</h2>

      <div className="session-info-grid">
        <div className="session-info-item">
          <p>
            <b>Session ID:</b>
          </p>
          <p>{event?.id}</p>
        </div>
        <div className="session-info-item">
          <p>
            <b>Presenter:</b>
          </p>
          <p>
            {event?.instructors
              ?.map(
                (instructor) =>
                  `${instructor?.first_name} ${instructor?.last_name}`
              )
              .join(', ')}
          </p>
        </div>
        <div className="session-info-item">
          <p>
            <b>Facilitator:</b>
          </p>
          <p>{event?.contact_person}</p>
        </div>
        <div className="session-info-item">
          <p>
            <b>Description:</b>
          </p>
          <p>{event?.details}</p>
        </div>
        <div className="session-info-item">
          <p>
            <b>Credits Available:</b>
          </p>
          <p>{event?.certificate_type_id}</p>
        </div>
      </div>
    </div>
  );
};

SessionInfo.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    instructors: PropTypes.arrayOf(
      PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      })
    ),
    contact_person: PropTypes.string,
    details: PropTypes.string,
    certificate_type_id: PropTypes.string,
    event_dates: PropTypes.arrayOf(
      PropTypes.shape({
        start_time: PropTypes.string,
      })
    ),
  }),
};
