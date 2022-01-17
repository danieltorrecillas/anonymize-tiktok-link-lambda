/**
 * Class representing an unexpected error response based on the required format for a Lambda response invoked by API
 * Gateway
 * @see {@link toJson}
 */
class UnexpectedErrorResponse {
  /**
   * @type {number}
   */
  #statusCode = 500
  /**
   * @type {{'Access-Control-Allow-Origin': string}}
   */
  #headers = {'Access-Control-Allow-Origin': '*'}
  /**
   * @type {{}}
   */
  #body

  /**
   * @param {{}} body
   */
  constructor(body = {errorMessage: 'An unexpected error occurred'}) {
    this.#body = body
  }

  /**
   * @returns {UnexpectedErrorResponse}
   */
  static createWithDefaultBody() {
    return new this()
  }

  /**
   * Returns object conforming to
   * [output format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format}
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: number}}
   */
  toJson() {
    return {
      statusCode: this.#statusCode,
      headers: this.#headers,
      body: JSON.stringify(this.#body)
    }
  }
}

module.exports = UnexpectedErrorResponse
