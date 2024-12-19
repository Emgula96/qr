//TO CHECK IF THE USER IS LATE FOR THE SESSION
// IF PAST LATE THRESHOLD, FAIL CHECK IN

import { parseISO, isPast, addMinutes } from 'date-fns';

export const isLateCheckIn = (event) => {
  if (event && event?.event_dates && event?.event_dates[0]) {
    const { event_date, start_time } = event.event_dates[0];
    const sessionStartTime = parseISO(`${event_date}T${start_time}`);
    const lateThreshold = addMinutes(
      sessionStartTime,
      event.late_threshold || 0
    );

    return isPast(lateThreshold);
  }
  return false;
};
