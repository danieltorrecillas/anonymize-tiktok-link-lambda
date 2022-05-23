const TikTokUrl = require('../src/TikTokUrl')
const PresentableError = require('../src/PresentableError')
const constants = require('../src/Constants')

describe('unit', () => {
  describe('constructor(url)', () => {
    describe('constructs successfully', () => {
      test('with a valid URL', () => {
        const url = new URL(constants.unitTestTikTokTrackingUrl)
        const tikTokUrl = new TikTokUrl(url)
        expect(tikTokUrl.value).toEqual(url)
      })
    })

    describe('throws', () => {
      test('with null url', () => {
        expect(() => {
          new TikTokUrl(null)
        }).toThrow(new PresentableError('The URL is missing'))
      })

      test('with undefined url', () => {
        expect(() => {
          new TikTokUrl(undefined)
        }).toThrow(new PresentableError('The URL is missing'))
      })

      test('when url is not a URL', () => {
        expect(() => {
          new TikTokUrl(123456789)
        }).toThrow(new PresentableError('The URL entered is not a valid URL'))
      })

      test('when url is still not a URL', () => {
        expect(() => {
          new TikTokUrl(constants.unitTestTikTokTrackingUrl)
        }).toThrow(new PresentableError('The URL entered is not a valid URL'))
      })

      test('when url does not belong to www.tiktok.com', () => {
        expect(() => {
          const url = new URL('https://m.tiktok.com/v/7022710108492696837.html?_d=secCgwIARCbDRjEFSACKAESPgo')
          new TikTokUrl(url)
        }).toThrow(new PresentableError('The URL entered is not from www.tiktok.com'))
      })
    })
  })

  describe('asString()', () => {
    test('returns a string representation of instance URL', () => {
      const url = new URL(constants.unitTestTikTokTrackingUrl)
      const urlAsString = constants.unitTestTikTokTrackingUrl
      const tikTokUrl = new TikTokUrl(url)
      expect(tikTokUrl.asString()).toEqual(urlAsString)
    })
  })
})
