import rest from './util/rest.js' 

const host = import.meta.env.VITE_ENVIRONMENT === 'development' ? 'http://localhost:3030/kiosk-express' : '/api'

async function getUserInfo(email, firstName, lastName) {
  return await rest.get(`${host}/v1/users?email=${email}&first_name=${firstName}&last_name=${lastName}`)
}

async function getUserAndFirstEvent(email, firstName, lastName) {
  return await rest.get(`${host}/v1/users?email=${email}&first_name=${firstName}&last_name=${lastName}`)
}

export default {
  getUserInfo,
  getUserAndFirstEvent,
}