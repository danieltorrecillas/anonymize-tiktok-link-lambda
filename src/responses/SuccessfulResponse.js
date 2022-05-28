/**
 * Class representing a successful response based on the required format for a Lambda response invoked by API Gateway
 * @see {@link toAwsResponseObject}
 */
class SuccessfulResponse {
  /**
   * @type {number}
   */
  #statusCode = 200
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
  constructor(body) {
    if (body == null) {
      throw new TypeError('body is null or undefined')
    }
    this.#body = body
  }

  /**
   * @param {{}} body
   * @returns {SuccessfulResponse}
   */
  static fromBody(body) {
    return new this(body)
  }

  /**
   * Returns object conforming to
   * [output format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format}
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: number}}
   */
  toAwsResponseObject() {
    return {
      statusCode: this.#statusCode,
      headers: this.#headers,
      body: JSON.stringify(this.#body)
    }
  }
}

module.exports = SuccessfulResponse
