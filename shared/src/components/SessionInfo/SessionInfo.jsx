import { PropTypes } from 'prop-types';

export const SessionInfo = ({ event }) => (
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
            (instructor) => `${instructor?.first_name} ${instructor?.last_name}`
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
);

SessionInfo.propTypes = {
  event: PropTypes.object.isRequired,
};
