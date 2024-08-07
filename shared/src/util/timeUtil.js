// Utility to round date to the nearest 5 minutes
function roundToNearest5Minutes(date) {
  const ms = 1000 * 60 * 5; // 5 minutes in milliseconds
  return new Date(Math.round(date.getTime() / ms) * ms);
}

// Utility to format date to ISO 8601
function formatDateToISO8601(date) {
  const pad = (num) => num.toString().padStart(2, '0');
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// Main function to get the current time rounded to the nearest 5 minutes in ISO 8601 format
function getCurrentTimeRoundedToNearest5Minutes() {
  const now = new Date();
  const roundedDate = roundToNearest5Minutes(now);
  return formatDateToISO8601(roundedDate);
}

// Export the main function
export { getCurrentTimeRoundedToNearest5Minutes };