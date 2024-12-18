import service from './service';
import { displaySession } from '../../pages/CheckIn/displaySession';

export const fetchEvent = async (roomName, currentTime) => {
  try {
    const todayEvents = await service.getEventByRoomAndTime(
      roomName,
      currentTime.toLocaleDateString('en-CA')
    );
    return displaySession(todayEvents);
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};