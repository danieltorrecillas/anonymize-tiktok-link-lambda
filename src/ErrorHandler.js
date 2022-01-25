const PresentableError = require('./PresentableError')
const PresentableErrorResponse = require('./PresentableErrorResponse')
const UnexpectedErrorResponse = require('./UnexpectedErrorResponse')

/**
 * Class to handle an error
 */
class ErrorHandler {
  /**
   * @type {Error}
   */
  #error

  /**
   * @param {Error} error
   */
  constructor(error) {
    if (error == null) {
      throw new TypeError('error is null or undefined')
    }
    if (!(error instanceof Error)) {
      throw new TypeError('error is not an Error')
    }
    this.#error = error
  }

  /**
   * @param {Error} error
   * @returns {ErrorHandler}
   */
  static fromError(error) {
    return new this(error)
  }

  /**
   * Logs this object's error and returns an error response appropriate for the type of said error
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: number}}
   */
  handle() {
    console.error(this.#error)
    if (this.#error instanceof PresentableError) {
      return PresentableErrorResponse.fromError(this.#error).toAwsResponseObject()
    }
    return UnexpectedErrorResponse.createWithDefaultBody().toAwsResponseObject()
  }
}

module.exports = ErrorHandler
