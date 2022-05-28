const TikTokTrackingUrl = require('./TikTokTrackingUrl')
const constants = require('./Constants')

describe('unit', () => {
  describe('constructor(url)', () => {
    describe('constructs successfully', () => {
      test('with a valid URL', () => {
        const url = new URL(constants.unitTestFirstRedirectedTikTokTrackingUrl)
        const tikTokTrackingUrl = new TikTokTrackingUrl(url)
        expect(tikTokTrackingUrl.value).toEqual(url)
      })
    })

    describe('throws', () => {
      test('with null url', () => {
        expect(() => {
          new TikTokTrackingUrl(null)
        }).toThrow(new TypeError('url is null or undefined'))
      })

      test('with undefined url', () => {
        expect(() => {
          new TikTokTrackingUrl(undefined)
        }).toThrow(new TypeError('url is null or undefined'))
      })

      test('when url is not a URL', () => {
        expect(() => {
          new TikTokTrackingUrl(123456789)
        }).toThrow(new TypeError('url is not a valid URL'))
      })

      test('when url is still not a URL', () => {
        expect(() => {
          new TikTokTrackingUrl(constants.unitTestFirstRedirectedTikTokTrackingUrl)
        }).toThrow(new TypeError('url is not a valid URL'))
      })
    })
  })
})
