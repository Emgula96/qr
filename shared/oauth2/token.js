const getAccessToken = async () => {
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const url = process.env.API_AUTH_TOKEN_URL

    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
    }

    let formBody = [];
    for (const property in body) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const resp = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
    })

    const respJson = await resp.json()
    return respJson.access_token
}

export default getAccessToken