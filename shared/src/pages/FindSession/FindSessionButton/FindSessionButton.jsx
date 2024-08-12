// src/components/FindSessionsButton.jsx

import { Link } from 'react-router-dom';
import './find-session-button.scss';

const FindSessionsButton = ({ deviceId }) => {
  return (
    <Link
      to={`/find-session?deviceId=${deviceId}`}
      className="find-sessions-button"
    >
      Find Sessions
    </Link>
  );
};

export default FindSessionsButton;
