import rest from './util/rest.js' 

const host = import.meta.env.VITE_ENVIRONMENT === 'development' ? 'http://localhost:3030/kiosk-express' : '/api'

async function getUserInfo() {
  return await rest.get(`${host}/v1/users`)
}

export default {
  getUserInfo,
}