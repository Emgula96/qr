import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import TimeStamp from '../../components/TimeStamp';
import Content from '../../components/Content';
import service from '../../util/Functions/service';
import './session-info.scss';
import SessionInfoCard from './SessionInfoCard/SessionInfoCard';
import Layout from '../FindSession/FindSessionButton/Layout';

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
        <Layout deviceId={deviceId} />
        {/* )} */}
      </Content>
    </Page>
  );
}

export default SessionInfo;
