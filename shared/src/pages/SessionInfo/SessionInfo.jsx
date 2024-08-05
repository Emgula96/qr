import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import TimeStamp from '../../components/TimeStamp';
import Content from '../../components/Content';
import service from '../../service';
import './session-info.scss';
import SessionInfoCard from './SessionInfoCard/SessionInfoCard';

function SessionInfo() {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  // Get the query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const firstName = queryParams.get('firstName');
  const lastName = queryParams.get('lastName');
  const deviceId = queryParams.get('deviceId');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const userInfo = await service.getUserAndFirstEvent(
          email,
          firstName,
          lastName
        );
        setUser(userInfo);
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
  if (error) return <p>Error: {error}</p>;

  return (
    <Page>
      <TimeStamp />
      <div className="center-container">
        <h1>Welcome to Region 4</h1>
        <SessionInfoCard />
      </div>
      <Content>
        {/* {!!user && ( */}
        <div>
          {/* <Link
              to={{
                pathname: '/find-session',
                search: `deviceId=${deviceId}`,
              }}
            >
              <button>Find Session</button>
            </Link>
            <Link
              to={{
                pathname: '/print-badge',
                search: `userId=${user.user_id}&eventId=${user.event_id}&deviceId=${deviceId}`,
              }}
            >
              <button>Print Badge</button>
            </Link> */}
        </div>
        {/* )} */}
      </Content>
    </Page>
  );
}

export default SessionInfo;
