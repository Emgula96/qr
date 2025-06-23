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
  const [eventList, setEventList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

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
        //lowercase the first name and last name
        const lowerFirstName = firstName.toLowerCase();
        const lowerLastName = lastName.toLowerCase();
        const userInfo = await service.getUserEvents(
          email,
          lowerFirstName,
          lowerLastName
        );
        setEventList(userInfo);
        
        // Set date to today's date in YYYY-MM-DD format
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);
        
        // Filter events by today's date
        const eventsForDate = userInfo.filter(event => 
          event.event_dates.some(eventDate => 
            eventDate.event_date === formattedDate
          )
        );
        setFilteredEvents(eventsForDate);
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
  
  // Find first event where the first event date matches today's date
  const firstEvent = eventList ? eventList.find(event => 
    event.event_dates[0].event_date === date
  ) ?? null : null;

  console.log(eventList);
  console.log(firstEvent);
  return (
    <Page>
      
      <TimeStamp />
      <div className="center-container">
        <h1>Welcome to Region 4</h1>
        <Content>
        <Link to="/find-session" className="find-sessions-button">
          Go Back
        </Link>
        <Link to="/" className="find-sessions-button">
          Home
        </Link>
      </Content>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(session => (
            <SessionListCard
              key={session.id}
              event={session}
              name={`${firstName} ${lastName}`}
              email={email}
            />
          ))
        ) : (
          <KioskError
            title="Session or User Not Found"
            message="We are unable to find this session please double check all spellings. Please visit Registration Services if you are still having issues."
          />
        )}
      </div>
    </Page>
  );
}

export default SessionList;
