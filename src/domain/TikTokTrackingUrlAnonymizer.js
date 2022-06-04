const TikTokTrackingUrl = require('./TikTokTrackingUrl')
/**
 * Class to anonymize a URL
 */
class TikTokTrackingUrlAnonymizer {
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
   * @returns {TikTokTrackingUrlAnonymizer}
   */
  static fromUrl(url) {
    return new this(url)
  }

  /**
   * Removes the tracking. Sometimes there is a .html portion to remove. But there is always a query string to remove.
   * @returns {URL}
   */
  anonymize() {
    const shorterUrl = this.#url.value.origin + this.#url.value.pathname
    const noHtmlUrl = shorterUrl.split('.html')[0]
    const anonymousUrl = noHtmlUrl.split('?')[0]
    return new URL(anonymousUrl)
  }
}

module.exports = TikTokTrackingUrlAnonymizer
