import { useEffect, useState, useCallback } from 'react';
import service from '../../../util/Functions/service';
import displaySession from '../displaySession';

export const useEventData = (roomName) => {
  const [event, setEvent] = useState(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  const fetchEvent = useCallback(async () => {
    try {
      const todayEvents = await service.getEventByRoomAndTime(
        roomName,
        currentTime.toLocaleDateString('en-CA')
      );
      console.log('Today events:', todayEvents);
      const session = displaySession(todayEvents);
      console.log('Session:', session);
      return session;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  }, [roomName, currentTime]);

  useEffect(() => {
    const updateEvent = async () => {
      const newEventData = await fetchEvent();
      setEvent(newEventData);
    };

    updateEvent();
    const intervalId = setInterval(updateEvent, 3 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [fetchEvent]);

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(timerId);
  }, []);

  return { event, currentTime };
};
