/**
 * Class to anonymize a URL
 */
class UrlAnonymizer {
  /**
   * @type {URL}
   */
  #url

  /**
   * @param {URL} url
   */
  constructor(url) {
    if (url == null) {
      throw new TypeError('url is null or undefined.')
    }
    if (!(url instanceof URL)) {
      throw new TypeError('url is not a valid URL')
    }
    this.#url = url
  }

  /**
   * @param {URL} url
   * @returns {UrlAnonymizer}
   */
  static fromUrl(url) {
    return new this(url)
  }

  /**
   * Removes the tracking implemented with the query string of a URL and returns the new URL
   * @returns {URL}
   */
  anonymize() {
    const shorterUrl = this.#url.origin + this.#url.pathname
    const anonymousUrl = shorterUrl.split('.html')[0]
    return new URL(anonymousUrl)
  }
}

module.exports = UrlAnonymizer
