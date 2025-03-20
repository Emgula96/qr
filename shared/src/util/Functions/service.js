import rest from './rest.js';

const host =
  import.meta.env.VITE_ENVIRONMENT === 'development'
    ? import.meta.env.VITE_API_ROOT_URL
    : '/api';
  

async function getUserInfo(email, firstName, lastName) {
  return await rest.get(
    `${host}/v1/users?email=${email}&first_name=${firstName}&last_name=${lastName}`
  );
}

async function getUserEvents(email, firstName, lastName) {
  const { data } = await rest.get(
    `${host}/v1/users?userId=${email}&first_name=${firstName}&last_name=${lastName}`
  );
  return data;
}

async function getEventByRoomAndTime(roomName, time) {
  console.log('fetching event service FILE');
  console.log(roomName)
  const { data } = await rest.get(
    `${host}/v1/room/event?roomname=${roomName}&time=${time}`
  );
  return data;
}

async function getAttendance(id) {
  const { data } = await rest.get(`${host}/v1/attendance?eventId=${id}`);
  return data;
}

async function generateQrCode(eventId, userId) {
  const { data } = await rest.get(
    `${host}/v1/qr?userId=${userId}&sessionId=${eventId}`
  );
  return data;
}

async function checkInUser(userId, eventId, sessionDateTimeId) {
  try {
    console.log('Attempting check-in with:', { userId, eventId, sessionDateTimeId });
    const apiKey = JSON.parse(import.meta.env.VITE_API_KEY)['API-KEY'];
    console.log('API Key present:', !!apiKey);
    
    const response = await rest.put(`${host}/v1/attendance/check-in`, {
      userId,
      eventId,
      sessionDateTimeId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'API-KEY': apiKey
      }
    });
    
    console.log('Check-in response:', response);
    return response;
  } catch (error) {
    console.error('Check-in error:', error);
    // Rethrow the error to be handled by the caller
    throw error;
  }
}

// This should only be used for local debugging with the application in a development mode
async function getAccessToken(code) {
  const details = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost',
  };

  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  const resp = await fetch('/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  });
  const json = await resp.json();
  return json;
}

export default {
  getUserInfo,
  getUserEvents,
  generateQrCode,
  getAccessToken,
  getEventByRoomAndTime,
  getAttendance,
  checkInUser,
};
