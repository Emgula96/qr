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
  const currentDate = new Date();
  const localCurrentTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  ).getTime();

  for (const session of sessions) {
    for (const eventDate of session.event_dates) {
      const startTime = parseEventDateTime(
        eventDate.event_date,
        eventDate.start_time
      ).getTime();

      // Rule 1: Display session information 30 minutes before the scheduled session start time
      if (
        localCurrentTime < startTime &&
        getTimeDifference(startTime, localCurrentTime) <= 30
      ) {
        return session; // Return the session that is within 30 minutes of starting
      }

      const lateThreshold = session.late_threshold || 0;
      const lateThresholdTime = startTime + lateThreshold * 60000;

      // Rule 2: Check if the session is in progress and within the late threshold
      if (
        localCurrentTime >= startTime &&
        localCurrentTime <= lateThresholdTime
      ) {
        return session; // Return the session if it's in progress or within the late threshold
      }

      // Rule 3: If no sessions are scheduled within 1 hour, continue checking the next session
      if (
        localCurrentTime < startTime &&
        getTimeDifference(startTime, localCurrentTime) > 60
      ) {
        continue; // Continue to the next session instead of returning an empty array
      }

      // Rule 4: If no previous sessions before a scheduled session, display session information 1 hour before start
      if (
        localCurrentTime < startTime &&
        getTimeDifference(startTime, localCurrentTime) <= 60
      ) {
        return session; // Return session within 1 hour of starting
      }
    }
  }

  return null;
};

export default displaySession;
