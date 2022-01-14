const axios = require('axios')

exports.handler = async event => {
  const response = await callTikTok(event.queryStringParameters.url)
  const url = convertUrl(response)
  const body = {url}
  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(body)
  }
}

async function callTikTok(url) {
  const response = await axios.head(url, {
    maxRedirects: 0,
    validateStatus: status => status === 301
  })
  return response.headers.location
}

function convertUrl(url) {
  const completeUrl = new URL(url)
  const shorterUrl = completeUrl.origin + completeUrl.pathname
  return shorterUrl.split('.html')[0]
}
