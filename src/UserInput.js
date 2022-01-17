const PresentableError = require('./PresentableError')

/**
 * Class representing user input
 */
class UserInput {
  /**
   * @type {URL}
   */
  #searchUrl

  /**
   * @param {{}} event
   * [input format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format}
   */
  constructor(event) {
    if (event == null || event.queryStringParameters == null || event.queryStringParameters.url == null) {
      throw new TypeError('Event malformed. Expected a URL with a query string of "url".')
    }
    if (event.queryStringParameters.url === '') {
      throw new RangeError('The URL is empty.')
    }
    this.#searchUrl = this.#makeUrl(event.queryStringParameters.url.trim())
  }

  /**
   * @param {string} url
   * @returns {URL}
   */
  #makeUrl(url) {
    try {
      return new URL(url)
    } catch {
      throw new PresentableError('The URL entered is not a valid URL')
    }
  }

  /**
   * @returns {URL}
   */
  get searchUrl() {
    return this.#searchUrl
  }
}

module.exports = UserInput
