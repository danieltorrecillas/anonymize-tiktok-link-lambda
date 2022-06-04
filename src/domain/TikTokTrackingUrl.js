/**
 * Class representing an url to something on tiktok.com with tracking
 * @example https://m.tiktok.com/v/7022710108492696837.html?_d=secCgYIASAHKAESPgo8V0F9f
 */
class TikTokTrackingUrl {
  /**
   * @type {URL}
   */
  #value

  /**
   * @param {URL} url - A URL to something on tiktok.com with tracking
   */
  constructor(url) {
    if (url == null) {
      throw new TypeError('url is null or undefined')
    }
    if (!(url instanceof URL)) {
      throw new TypeError('url is not a valid URL')
    }
    if (!url.hostname.includes('tiktok.com')) {
      throw new TypeError('The URL entered is not from tiktok.com')
    }
    this.#value = url
  }

  /**
   * @returns {URL}
   */
  get value() {
    return this.#value
  }
}

module.exports = TikTokTrackingUrl
