const PresentableError = require('./PresentableError')

/**
 * Class representing an AWS Event
 */
class AwsEvent {
  /**
   * @type {URL}
   */
  #searchUrl

  /**
   * @param {{}} event
   * [input format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format}
   */
  constructor(event) {
    if (event == null || event.queryStringParameters == null || event.queryStringParameters.url == null || (typeof event.queryStringParameters.url !== 'string')) {
      throw new TypeError('Event malformed. Expected a URL with a query string of "url".')
    }
    if (event.queryStringParameters.url === '') {
      throw new RangeError('The URL is empty.')
    }
    this.#searchUrl = AwsEvent.#makeUrl(event.queryStringParameters.url.trim())
  }

  /**
   * @param {string} url
   * @returns {URL}
   */
  static #makeUrl(url) {
    try {
      return new URL(url)
    } catch {
      throw new PresentableError(400, 'The URL entered is not a valid URL')
    }
  }

  /**
   * @returns {URL}
   */
  get searchUrl() {
    return this.#searchUrl
  }
}

module.exports = AwsEvent
