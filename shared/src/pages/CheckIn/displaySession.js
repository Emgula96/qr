const getTimeDifference = (startTime, endTime) => {
  return (startTime - endTime) / (1000 * 60); // returns difference in minutes
};

// Helper function to parse event dates and times as local times
const parseEventDateTime = (eventDate, eventTime) => {
  const dateParts = eventDate.split('-');
  const timeParts = eventTime.split(':');
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Create date using local timezone
  date.setHours(timeParts[0], timeParts[1], timeParts[2]); // Set local hours, minutes, and seconds
  return date;
};

// Main function to display a session based on the rules
const displaySession = (sessions) => {
  console.log('Input sessions:', sessions);
  
  if (!sessions) {
    console.log('No sessions provided');
    return null;
  }

  // Handle both direct array and response object with data property
  const sessionsArray = Array.isArray(sessions) ? sessions : sessions.data || sessions;
  
  if (!Array.isArray(sessionsArray) || sessionsArray.length === 0) {
    console.log('Invalid sessions array:', sessionsArray);
    return null;
  }

  console.log('Processing sessions array:', sessionsArray);

  const currentDate = new Date();
  const localCurrentTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  ).getTime();

  console.log('Current time:', new Date(localCurrentTime));

  // Sort sessions by start time to ensure we get the most relevant one
  const sortedSessions = [...sessionsArray].sort((a, b) => {
    const aTime = parseEventDateTime(a.event_dates[0].event_date, a.event_dates[0].start_time).getTime();
    const bTime = parseEventDateTime(b.event_dates[0].event_date, b.event_dates[0].start_time).getTime();
    return aTime - bTime;
  });

  for (const session of sortedSessions) {
    console.log('Processing session:', session);
    
    if (!session.event_dates || !Array.isArray(session.event_dates)) {
      console.log('Invalid session event_dates:', session);
      continue;
    }

    for (const eventDate of session.event_dates) {
      console.log('Processing event date:', eventDate);
      
      if (!eventDate.event_date || !eventDate.start_time) {
        console.log('Invalid event date:', eventDate);
        continue;
      }

      const startTime = parseEventDateTime(
        eventDate.event_date,
        eventDate.start_time
      ).getTime();

      console.log('Session start time:', new Date(startTime));
      console.log('Time difference:', getTimeDifference(startTime, localCurrentTime));

      // Rule 1: Display session information 30 minutes before the scheduled session start time
      if (
        localCurrentTime < startTime &&
        getTimeDifference(startTime, localCurrentTime) <= 30
      ) {
        console.log('Found session within 30 minutes of start');
        return session;
      }

      const lateThreshold = session.late_threshold || 0;
      const lateThresholdTime = startTime + lateThreshold * 60000;

      // Rule 2: Check if the session is in progress and within the late threshold
      if (
        localCurrentTime >= startTime &&
        localCurrentTime <= lateThresholdTime
      ) {
        console.log('Found session in progress within late threshold');
        return session;
      }

      // Rule 3: If no sessions are scheduled within 1 hour, continue checking the next session
      if (
        localCurrentTime < startTime &&
        getTimeDifference(startTime, localCurrentTime) > 60
      ) {
        continue;
      }

      // Rule 4: If no previous sessions before a scheduled session, display session information 1 hour before start
      if (
        localCurrentTime < startTime &&
        getTimeDifference(startTime, localCurrentTime) <= 60
      ) {
        console.log('Found session within 1 hour of start');
        return session;
      }
    }
  }

  // If no session matches the rules, return the first session
  if (sortedSessions.length > 0) {
    console.log('No matching session found, returning first session');
    return sortedSessions[0];
  }

  console.log('No sessions available');
  return null;
};

export default displaySession;
