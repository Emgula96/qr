// Helper function to calculate the time difference in minutes between two Date objects
const getTimeDifference = (startTime, endTime) => {
    return (startTime - endTime) / (1000 * 60); // returns difference in minutes
  };
  
  // Main function to display a session based on the rules
  const displaySession = (sessions) => {
    const currentDate = new Date(); // Get current time at function invocation
  
    // Loop through each session and its event dates
    for (const session of sessions) {
      for (const eventDate of session.event_dates) {
        const startTime = new Date(`${eventDate.event_date}T${eventDate.start_time}`);
        const endTime = new Date(`${eventDate.event_date}T${eventDate.end_time}`);
  
        // Rule 1: Display session information 30 minutes before the scheduled session start time
        if (currentDate < startTime && getTimeDifference(startTime, currentDate) <= 30) {
          return session;  // Return the session that is within 30 minutes of starting
        }
  
        // Rule 2: Do not display any session past the late threshold
        const lateThreshold = session.late_threshold || 0;
        const lateThresholdTime = new Date(startTime.getTime() + lateThreshold * 60000); // add late threshold time
        if (currentDate > lateThresholdTime && currentDate < endTime) {
          continue;  // Skip this session as it's past the late threshold
        }
  
        // Rule 3: If no scheduled sessions within at least 1 hour, return an empty array
        if (currentDate < startTime && getTimeDifference(startTime, currentDate) > 60) {
          return [];
        }
  
        // Rule 4: If no previous sessions before a scheduled session, display session information 1 hour before start
        if (currentDate < startTime && getTimeDifference(startTime, currentDate) <= 60) {
          return session;  // Return session within 1 hour of starting
        }
      }
    }
  
    // If no sessions match, return an empty array
    return [];
  };
  
export default displaySession;