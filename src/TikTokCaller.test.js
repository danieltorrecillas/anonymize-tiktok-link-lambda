const TikTokCaller = require('./TikTokCaller')
const TikTokUrl = require('./TikTokUrl')
const TikTokTrackingUrl = require('./TikTokTrackingUrl')
const constants = require('./Constants')
const PresentableError = require('./PresentableError')

describe('unit', () => {
  describe('constructor(url)', () => {
    describe('constructs successfully', () => {
      test('with a valid url', () => {
        const url = new URL(constants.unitTestTikTokTrackingUrl)
        const tikTokUrl = new TikTokUrl(url)
        expect(new TikTokCaller(tikTokUrl)).toBeInstanceOf(TikTokCaller)
      })
    })

    describe('throws', () => {
      test('with null url', () => {
        expect(() => {
          new TikTokCaller(null)
        }).toThrow(new TypeError('url is null or undefined.'))
      })

      test('with undefined url', () => {
        expect(() => {
          new TikTokCaller(undefined)
        }).toThrow(new TypeError('url is null or undefined.'))
      })

      test('when url is not a TikTokUrl', () => {
        expect(() => {
          new TikTokCaller(constants.unitTestTikTokTrackingUrl)
        }).toThrow(new TypeError('url is not a valid TikTokUrl'))
      })

      test('when url is still not a TikTokUrl', () => {
        expect(() => {
          const url = new URL(constants.unitTestTikTokTrackingUrl)
          new TikTokCaller(url)
        }).toThrow(new TypeError('url is not a valid TikTokUrl'))
      })
    })
  })

  describe('fromUrl(url)', () => {
    test('returns a TikTokCaller instance', () => {
      const url = new URL(constants.unitTestTikTokTrackingUrl)
      const tikTokUrl = new TikTokUrl(url)
      expect(TikTokCaller.fromUrl(tikTokUrl)).toBeInstanceOf(TikTokCaller)
    })
  })

  describe('call()', () => {
    describe('returns first redirected URL', () => {
      test('with url of video that exists', async () => {
        const trackingUrl = new URL(constants.unitTestTikTokTrackingUrl)
        const firstRedirectedUrl = new TikTokTrackingUrl(new URL(constants.unitTestFirstRedirectedTikTokTrackingUrl))
        const tikTokUrl = new TikTokUrl(trackingUrl)
        const result = await TikTokCaller.fromUrl(tikTokUrl).call()
        expect(result).toEqual(firstRedirectedUrl)
      })
    })

    describe('throws', () => {
      test('with url of video that does not exist', async () => {
        // Mock console.error so expected error output doesn't come through to the test log
        const originalError = console.error
        console.error = jest.fn()

        const trackingUrl = new URL(constants.unitTestTikTokTrackingUrlWithNonExistentVideo)
        const tikTokUrl = new TikTokUrl(trackingUrl)
        await expect(TikTokCaller.fromUrl(tikTokUrl).call()).rejects.toEqual(new PresentableError('Could not find a video for that URL. Please double check and try again.'))

        // Reset console.error to original implementation
        console.error = originalError
      })
    })
  })
})

describe('integration', () => {
  describe('call()', () => {
    describe('returns first redirected URL', () => {
      test('with url of video that exists', async () => {
        // Mock console.warn so expected error output doesn't come through to the test log
        // TODO: Try and get https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest working so console.warn
        //  doesn't need to be mocked.
        const originalWarn = console.warn
        console.warn = jest.fn()

        const trackingUrl = new URL(constants.integrationTestTikTokTrackingUrl)
        const firstRedirectedUrl = new TikTokTrackingUrl(new URL(constants.integrationTestFirstRedirectedTikTokTrackingUrl))
        const tikTokUrl = new TikTokUrl(trackingUrl)
        const result = await TikTokCaller.fromUrl(tikTokUrl).call()
        expect(result).toEqual(firstRedirectedUrl)

        // Reset console.warn to original implementation
        console.warn = originalWarn
      })
    })

    describe('throws', () => {
      test('with url of video that does not exist', async () => {
        // Mock console.warn and console.error so expected error output doesn't come through to the test log
        // TODO: Try and get https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest working so console.warn
        //  doesn't need to be mocked.
        const originalWarn = console.warn
        const originalError = console.error
        console.warn = jest.fn()
        console.error = jest.fn()

        const trackingUrl = new URL(constants.integrationTestTikTokTrackingUrlWithNonExistentVideo)
        const tikTokUrl = new TikTokUrl(trackingUrl)
        await expect(TikTokCaller.fromUrl(tikTokUrl).call()).rejects.toEqual(new PresentableError('Could not find a video for that URL. Please double check and try again.'))

        // Reset console.warn and console.error to original implementation
        console.warn = originalWarn
        console.error = originalError
      })
    })
  })
})
