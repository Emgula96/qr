// src/components/FindSessionsButton.jsx

import { Link } from 'react-router-dom';
import './find-session-button.scss';
import PropTypes from 'prop-types';

const FindSessionsButton = ({ email, firstName, lastName }) => {
  return (
    <Link
      to={`/session-list?&email=${email}&firstName=${firstName}&lastName=${lastName}`}
      className="find-sessions-button"
    >
      Find Sessions
    </Link>
  );
};

FindSessionsButton.propTypes = {
  deviceId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default FindSessionsButton;
