const axios = require('axios');

exports.handler = async event => {
  if (!event) {
    throw new TypeError('Malformed event')
  }
  if (!event.url) {

  }
  const response = await callTikTok(event.url)
  const url = convertUrl(response)
  return { url }
};

async function callTikTok(url) {
  const response = await axios.get(url, {
    maxRedirects: 0,
    validateStatus: function (status) {
      return status === 301;
    },
  })
  return response.headers.location
}

function convertUrl(url) {
  const largeUrl = new URL(url)
  const shorterUrl = largeUrl.origin + largeUrl.pathname
  return shorterUrl.split('.html')[0]
}
