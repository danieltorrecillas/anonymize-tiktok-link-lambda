const AwsEvent = require('./AwsEvent')
const TikTokUrl = require('./TikTokUrl')
const TikTokCaller = require('./TikTokCaller')
const TikTokTrackingUrlAnonymizer = require('./TikTokTrackingUrlAnonymizer')
const SuccessfulResponse = require('./SuccessfulResponse')

/**
 * Class to handle an event
 */
class EventHandler {
  /**
   * @type {{}}
   * [input format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format}
   */
  #event

  /**
   * @param {{}} event
   * [input format of a Lambda function for proxy integration]{@link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format}
   */
  constructor(event) {
    if (event == null) {
      throw new TypeError('event is null or undefined')
    }
    this.#event = event
  }

  /**
   * @param {{}} event
   * @see {@link constructor}
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
    const awsEvent = new AwsEvent(this.#event)
    const initialTrackingUrl = new TikTokUrl(awsEvent.searchUrl)
    const redirectedTrackingUrl = await TikTokCaller.fromUrl(initialTrackingUrl).call()
    const anonymizedUrl = TikTokTrackingUrlAnonymizer.fromUrl(redirectedTrackingUrl).anonymize()
    return SuccessfulResponse.fromBody({url: anonymizedUrl}).toAwsResponseObject()
  }
}

module.exports = EventHandler
