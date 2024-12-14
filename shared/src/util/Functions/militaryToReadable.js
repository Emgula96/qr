export const militaryToReadable = (timeStr = '10:00:00') => {
  // Split the input time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);

  // Determine if it's AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const readableHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  // Format the readable time string
  const readableTime = `${readableHours}:${minutes.toString().padStart(2, '0')} ${period}`;

  return readableTime;
};
