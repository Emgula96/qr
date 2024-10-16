export function extractErrorCode(message) {
  const match = message.match(/CODE_(\d+)/);
  return match ? match[1] : null;
}

// Helper function to map error codes to status messages
export function mapErrorCodeToStatusMessage(code) {
  switch (code.error) {
    case 400:
      return 'Check-In Error';
    case 402:
      return 'No Payment';
    case 403:
      return 'Wrong Session';
    case 404:
      return 'Session event or user not found.';
    case 409:
      return 'User Already Checked In';
    case 412:
      return 'Check-In Error';
    default:
      return 'An unexpected error occurred.';
  }
}
export function setStatusMessage(errorCode, setStatus) {
  const errorMessage = mapErrorCodeToStatusMessage(errorCode);
  setStatus(errorMessage);
}
