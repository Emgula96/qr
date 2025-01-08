export function extractErrorCode(message) {
  const match = message.match(/CODE_(\d+)/);
  return match ? match[1] : null;
}

// Helper function to map error codes to status messages
export function mapErrorCodeToStatusMessage(code) {
  switch (code) {
    case 400:
      return 'Invalid parameters provided';
    case 402:
      return 'Payment is required to proceed with check-in';
    case 403:
      return 'Wrong Session or insufficient permissions';
    case 404:
      return 'Session event or user not found';
    case 409:
      return 'User has already checked in';
    case 412:
      return 'Insufficient credit to complete check-in';
    default:
      return 'Check-In Error';
  }
}
export function setStatusMessage(errorCode, setStatus) {
  const errorMessage = mapErrorCodeToStatusMessage(errorCode);
  setStatus(errorMessage);
}
