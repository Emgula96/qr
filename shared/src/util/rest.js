async function get( url ) {

    const response = await fetch( url )
    const json = await response.json()
  
    return json
  
  }
  
  export default {
    get,
  }