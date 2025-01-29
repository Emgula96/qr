//TO HANDLE THE QR SCAN FOR CHECK IN
//RECEIVE SESSION ID AND USER ID FROM QR SCAN
//RECEIVE EVENT FROM EVENT OBJ

import { mapErrorCodeToStatusMessage } from '../../pages/CheckIn/CheckinFunctions';
import service from './service';

export const parseScan = (text) => {
  return Object.fromEntries(text.split(',').map((pair) => {
    const [key, value] = pair.split('=').map(str => str.trim());
    return [key, value];
  }));
};

export const handleQrScan = async (
  decodedText,
  event,
  beepSound,
  setStatus,
  isLate
) => {
  const { userId, sessionId } = parseScan(decodedText);
  const eventDateId = event?.event_dates[0]?.id;
  console.log('userId', userId);
  try {
    const checkedIn = await service.checkInUser(userId, sessionId, eventDateId);

    if (checkedIn.error) {
      beepSound.play();
      const errorMessage = mapErrorCodeToStatusMessage(checkedIn.statusCode);
      setStatus(errorMessage);
      throw checkedIn.statusCode;
    }

    beepSound.play();
    setStatus(isLate ? 'Late Check-In' : 'Success');
    return { success: true };
  } catch (err) {
    const errorMessage = mapErrorCodeToStatusMessage(err);
    setStatus(errorMessage);
    return { success: false };
  } finally {
    setTimeout(() => {
      setStatus(null);
    }, 4000);
  }
};
