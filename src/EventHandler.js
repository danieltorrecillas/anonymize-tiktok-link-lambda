const UserInput = require('./UserInput')
const TikTokUrl = require('./TikTokUrl')
const TikTokCaller = require('./TikTokCaller')
const UrlAnonymizer = require('./UrlAnonymizer')
const SuccessfulResponse = require('./SuccessfulResponse')

/**
 * Class to handle an Amazon Web Services event
 */
class EventHandler {
  /**
   * @type {{}}
   * [input format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format}
   */
  #event

  /**
   * @param {{}} event
   * @see {@link #event}
   */
  constructor(event) {
    if (event == null) {
      throw new TypeError('Event is null or undefined.')
    }
    this.#event = event
  }

  /**
   * @param {{}} event
   * @see {@link #event}
   * @returns {EventHandler}
   */
  static fromEvent(event) {
    return new this(event)
  }

  /**
   * Takes the user input, validates it, calls TikTok for redirects to a more descriptive URL, and returns the URL sans
   * tracking
   * @returns {Promise<{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: number}>}
   */
  async handle() {
    const userInput = new UserInput(this.#event)
    const initialTrackingUrl = new TikTokUrl(userInput.searchUrl)
    const redirectedTrackingUrl = await TikTokCaller.fromUrl(initialTrackingUrl).call()
    const url = UrlAnonymizer.fromUrl(redirectedTrackingUrl).anonymize()
    return SuccessfulResponse.fromBody({url}).toJson()
  }
}

module.exports = EventHandler
