import { mapErrorCodeToStatusMessage } from '../../pages/CheckIn/CheckinFunctions';

export const parseScan = text => 
  Object.fromEntries(text.split(',').map(pair => pair.split('=')));

export const handleQrScan = async (decodedText, event, beepSound, setStatus, isLate) => {
//   const { userId, sessionId } = parseScan(decodedText);
//   const eventDateId = event?.event_dates[0]?.id;

  // Test responses logic...
  const testResponses = [
    { error: false, statusCode: 200 },
    { error: true, statusCode: 400 },
    { error: true, statusCode: 403 },
    { error: true, statusCode: 404 },//come back to this
    { error: true, statusCode: 409 },
  ];
  const testResponse = testResponses[4];
  
  try {
    const checkedIn = testResponse;
    
    if (checkedIn.error) {
      beepSound.play();
      const errorMessage = mapErrorCodeToStatusMessage(checkedIn.statusCode);
      setStatus(errorMessage);
      throw checkedIn.statusCode;
    }

    beepSound.play();
    setStatus(isLate ? 'Late Check-In' : 'Success');
  } catch (err) {
    const errorMessage = mapErrorCodeToStatusMessage(err);
    setStatus(errorMessage);
  } finally {
    setTimeout(() => {
      setStatus(null);
    }, 4000);
  }
}; 