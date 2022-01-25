const PresentableError = require('./PresentableError')

/**
 * Class representing an url to something on vm.tiktok.com
 */
class TikTokUrl {
  /**
   * @type {URL}
   */
  #value

  /**
   * @param {URL} url - A URL to something on tiktok.com
   */
  constructor(url) {
    if (url == null) {
      throw new PresentableError('The URL is missing')
    }
    if (!(url instanceof URL)) {
      throw new PresentableError('The URL entered is not a valid URL')
    }
    if (!url.hostname.includes('vm.tiktok.com')) {
      throw new PresentableError('The URL entered is not from vm.tiktok.com')
    }
    this.#value = url
  }

  /**
   * @returns {string}
   */
  asString() {
    return this.#value.toString()
  }

  /**
   * @returns {URL}
   */
  get value() {
    return this.#value
  }
}

module.exports = TikTokUrl
