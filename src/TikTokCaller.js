const TikTokUrl = require('./TikTokUrl')
const TikTokTrackingUrl = require('./TikTokTrackingUrl')
const axios = require('axios')

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
    const response = await axios.head(this.#url.asString(), {
      maxRedirects: 0,
      validateStatus: status => status === 301
    })
    return new TikTokTrackingUrl(new URL(response.headers.location))
  }
}

module.exports = TikTokCaller
