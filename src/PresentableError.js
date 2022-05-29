/**
 * Subclass of Error to represent an error that could be shown to an end user
 */
class PresentableError extends Error {
  name = 'PresentableError'

  /**
   * @param {number} httpStatusCode
   * @param {string} message
   */
  constructor(httpStatusCode, message) {
    if (httpStatusCode == null) {
      throw new TypeError('httpStatusCode is null or undefined')
    }
    if (typeof httpStatusCode !== 'number') {
      throw new TypeError('httpStatusCode is not a number')
    }

    super(message)
    this.httpStatusCode = httpStatusCode
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PresentableError)
    }
  }
}

module.exports = PresentableError
