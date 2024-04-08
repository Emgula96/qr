/* eslint-disable quotes */
import rest from './util/rest.js' 

const host = import.meta.env.VITE_ENVIRONMENT === 'development' ? import.meta.env.VITE_API_URL : '/api'

async function getUserInfo(email, firstName, lastName) {
  return await rest.get(`${host}/v1/users?email=${email}&first_name=${firstName}&last_name=${lastName}`)
}

async function getUserAndFirstEvent(email, firstName, lastName) {
  const { data } = await rest.get(`${host}/v1/users?email=${email}&first_name=${firstName}&last_name=${lastName}`)
  return data[0]
}

async function generateQrCode(id) {
  const { data } = await rest.get(`${host}/v1/qr?id=${id}`)
  return data
}

// This should only be used for local debugging with the application in a development mode
async function getAccessToken(code) {
  const details = {
    'client_id': import.meta.env.VITE_CLIENT_ID,
    'client_secret': import.meta.env.VITE_CLIENT_SECRET,
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'http://localhost',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  const json = await resp.json()
  return json
}

export default {
  getUserInfo,
  getUserAndFirstEvent,
  generateQrCode,
  getAccessToken,
}