const TikTokTrackingUrl = require('./TikTokTrackingUrl')
/**
 * Class to anonymize a URL
 */
class UrlAnonymizer {
  /**
   * @type {TikTokTrackingUrl}
   */
  #url

  /**
   * @param {TikTokTrackingUrl} url
   */
  constructor(url) {
    if (url == null) {
      throw new TypeError('url is null or undefined.')
    }
    if (!(url instanceof TikTokTrackingUrl)) {
      throw new TypeError('url is not a valid TikTokTrackingUrl')
    }
    this.#url = url
  }

  /**
   * @param {TikTokTrackingUrl} url
   * @returns {UrlAnonymizer}
   */
  static fromUrl(url) {
    return new this(url)
  }

  /**
   * Removes the tracking implemented with the .html portion of the pathname
   * @returns {URL}
   */
  anonymize() {
    const shorterUrl = this.#url.value.origin + this.#url.value.pathname
    const anonymousUrl = shorterUrl.split('.html')[0]
    return new URL(anonymousUrl)
  }
}

module.exports = UrlAnonymizer
