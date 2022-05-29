/**
 * Class representing a presentable error response based on the required format for a Lambda response invoked by API
 * Gateway
 * @see {@link toAwsResponseObject}
 */
class PresentableErrorResponse {
  /**
   * @type {number}
   */
  #httpStatusCode
  /**
   * @type {{'Access-Control-Allow-Origin': string}}
   */
  #headers = {'Access-Control-Allow-Origin': '*'}

  /**
   * @type {{}}
   */
  #body

  /**
   * @param {number} httpStatusCode
   * @param {{}} body
   */
  constructor(httpStatusCode, body = {errorMessage: 'An error occurred'}) {
    if (httpStatusCode == null) {
      throw new TypeError('httpStatusCode is null or undefined')
    }
    if (typeof httpStatusCode !== 'number') {
      throw new TypeError('httpStatusCode is not a number')
    }
    this.#httpStatusCode = httpStatusCode
    this.#body = body
  }

  /**
   * @param {PresentableError} error
   * @returns {PresentableErrorResponse}
   */
  static fromError(error) {
    return new this(error.httpStatusCode, {errorMessage: error.message})
  }

  /**
   * Returns object conforming to
   * [output format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format}
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: number}}
   */
  toAwsResponseObject() {
    return {
      statusCode: this.#httpStatusCode,
      headers: this.#headers,
      body: JSON.stringify(this.#body)
    }
  }
}

module.exports = PresentableErrorResponse
