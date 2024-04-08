async function get( url ) {
  const headers = {
    'Content-Type': 'application/json'
  }
  // The below is used for local debugging
  if (import.meta.env.VITE_MODE_DEBUG_LOCAL_PROD && localStorage.getItem('access_token')) {
    headers['x-amzn-oidc-accesstoken'] = localStorage.getItem('access_token')
  } else if (localStorage.getItem('access_token')) {
    headers.Authorization = localStorage.getItem('access_token')
  }

  const response = await fetch( url, {
    headers
  })
  const json = await response.json()
  return json
}
  
export default {
  get,
}