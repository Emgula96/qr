import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Page from '../../components/Page';
import TimeStamp from '../../components/TimeStamp';
import Content from '../../components/Content';
import service from '../../util/Functions/service';
import './session-list.scss';
import SessionListCard from './SessionListCard/SessionListCard';
import KioskError from '../Kiosk/KioskError';

function SessionList() {
  const [event, setEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  // Get the query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const firstName = queryParams.get('firstName');
  const lastName = queryParams.get('lastName');
  // const deviceId = queryParams.get('deviceId');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const userInfo = await service.getUserAndFirstEvent(
          email,
          firstName,
          lastName
        );
        setEvent(userInfo);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [email, firstName, lastName]);
  if (isLoading) return <p>Loading...</p>;
  const sessionId = event?.id ?? null;
  const firstSession = event?.event_dates?.[0] ?? null;
  const room = firstSession?.room?.name ?? '';
  const title = event?.sub_title ?? '';
  return (
    <Page>
      <TimeStamp />
      <div className="center-container">
        <h1>Welcome to Region 4</h1>
        {event?.event_dates?.length > 0 ? (
          <SessionListCard
            name={`${firstName} ${lastName}`}
            email={email}
            sessionTitle={title}
            room={room}
            sessionId={sessionId}
          />
        ) : (
          <KioskError
            title="Session or User Not Found"
            message="We are unable to find this session please double check all spellings. Please visit Registration Services if you are still having issues."
          />
        )}
      </div>
      <Content>
        <Link to="/find-session" className="find-sessions-button">
          Go Back
        </Link>
      </Content>
    </Page>
  );
}

export default SessionList;
