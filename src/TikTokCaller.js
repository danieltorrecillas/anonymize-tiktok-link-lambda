const axios = require('axios')
const PresentableError = require('./PresentableError')
const TikTokUrl = require('./TikTokUrl')
const TikTokTrackingUrl = require('./TikTokTrackingUrl')

/**
 * Class to call TikTok and get first redirected URL
 */
class TikTokCaller {
  /**
   * @type {TikTokUrl}
   */
  #url

  /**
   * @param {TikTokUrl} url
   */
  constructor(url) {
    if (url == null) {
      throw new TypeError('url is null or undefined.')
    }
    if (!(url instanceof TikTokUrl)) {
      throw new TypeError('url is not a valid TikTokUrl')
    }
    this.#url = url
  }

  /**
   * @param {TikTokUrl} url
   * @returns {TikTokCaller}
   */
  static fromUrl(url) {
    return new this(url)
  }

  /**
   * Makes a `HEAD` request to TikTok and returns the location of the first redirect wrapped in a TikTokTrackingUrl
   * @returns {Promise<TikTokTrackingUrl>}
   */
  async call() {
    try {
      const response = await axios.head(this.#url.asString(), {
        maxRedirects: 0,
        validateStatus: status => status === 301
      })
      return new TikTokTrackingUrl(new URL(response.headers.location))
    } catch (error) {
      console.error(error.toJSON())
      throw new PresentableError(404, 'Could not find a video for that URL. Please double check and try again.')
    }
  }
}

module.exports = TikTokCaller
