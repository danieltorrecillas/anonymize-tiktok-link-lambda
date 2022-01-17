/**
 * Subclass of Error to represent an error that could be shown to an end user
 */
class PresentableError extends Error {
  name = 'PresentableError'

  /**
   * @param {string} message
   */
  constructor(message) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PresentableError)
    }
  }
}

module.exports = PresentableError
