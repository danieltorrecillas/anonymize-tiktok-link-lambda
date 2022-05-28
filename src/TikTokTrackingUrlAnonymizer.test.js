const TikTokTrackingUrlAnonymizer = require('./TikTokTrackingUrlAnonymizer')
const TikTokTrackingUrl = require('./TikTokTrackingUrl')

describe('unit', () => {
  describe('constructor(url)', () => {
    describe('constructs successfully', () => {
      test('with a valid TikTokTrackingUrl', () => {
        const url = new URL('https://m.tiktok.com/v/7022710108492696837.html?_d=secCgwIARCbDRjEFSACKAESPgo8Zy9A3%2FUvhEBTPhqjkF3ywQeGMkBe9o4NTRzZYCgKl663cHkx8soLeb0PaRcVKsmCLvTZZmb7GpDnFgiqGgA%3D&checksum=7cdb231c45101ac85270415acac9402c43b6cef8410d2a4edeaf0dfb8a6bff82&language=en&preview_pb=0&sec_user_id=MS4wLjABAAAATFuB0JYb0ZLahI6ZGmXxUfRz3yXZal3_EQCAHXkbAV3NcsGEPLl464S4rWnqjssD&share_app_id=1233&share_item_id=7022710108492696837&share_link_id=1D22A11A-9C5B-49E0-B90A-4D9B9849D136&source=h5_m&timestamp=1635730818&tt_from=copy&u_code=d5296kadhc54ad&user_id=6664336694672162821&utm_campaign=client_share&utm_medium=ios&utm_source=copy')
        const tikTokTrackingUrl = new TikTokTrackingUrl(url)
        expect(new TikTokTrackingUrlAnonymizer(tikTokTrackingUrl)).toBeInstanceOf(TikTokTrackingUrlAnonymizer)
      })
    })

    describe('throws', () => {
      test('with null url', () => {
        expect(() => {
          new TikTokTrackingUrlAnonymizer(null)
        }).toThrow(new TypeError('url is null or undefined.'))
      })

      test('with undefined url', () => {
        expect(() => {
          new TikTokTrackingUrlAnonymizer(undefined)
        }).toThrow(new TypeError('url is null or undefined.'))
      })

      test('when url is not a TikTokTrackingUrl', () => {
        expect(() => {
          new TikTokTrackingUrlAnonymizer('https://m.tiktok.com/v/7022710108492696837')
        }).toThrow(new TypeError('url is not a valid TikTokTrackingUrl'))
      })
    })

    describe('fromUrl(url)', () => {
      test('returns a TikTokTrackingUrlAnonymizer instance', () => {
        const url = new URL('https://m.tiktok.com/v/7022710108492696837.html?_d=secCgwIARCbDRjEFSACKAESPgo8Zy9A3%2FUvhEBTPhqjkF3ywQeGMkBe9o4NTRzZYCgKl663cHkx8soLeb0PaRcVKsmCLvTZZmb7GpDnFgiqGgA%3D&checksum=7cdb231c45101ac85270415acac9402c43b6cef8410d2a4edeaf0dfb8a6bff82&language=en&preview_pb=0&sec_user_id=MS4wLjABAAAATFuB0JYb0ZLahI6ZGmXxUfRz3yXZal3_EQCAHXkbAV3NcsGEPLl464S4rWnqjssD&share_app_id=1233&share_item_id=7022710108492696837&share_link_id=1D22A11A-9C5B-49E0-B90A-4D9B9849D136&source=h5_m&timestamp=1635730818&tt_from=copy&u_code=d5296kadhc54ad&user_id=6664336694672162821&utm_campaign=client_share&utm_medium=ios&utm_source=copy')
        const tikTokTrackingUrl = new TikTokTrackingUrl(url)
        expect(TikTokTrackingUrlAnonymizer.fromUrl(tikTokTrackingUrl)).toBeInstanceOf(TikTokTrackingUrlAnonymizer)
      })

      describe('anonymize()', () => {
        test('returns an anonymized URL', () => {
          const url = new URL('https://m.tiktok.com/v/7022710108492696837.html?_d=secCgwIARCbDRjEFSACKAESPgo8Zy9A3%2FUvhEBTPhqjkF3ywQeGMkBe9o4NTRzZYCgKl663cHkx8soLeb0PaRcVKsmCLvTZZmb7GpDnFgiqGgA%3D&checksum=7cdb231c45101ac85270415acac9402c43b6cef8410d2a4edeaf0dfb8a6bff82&language=en&preview_pb=0&sec_user_id=MS4wLjABAAAATFuB0JYb0ZLahI6ZGmXxUfRz3yXZal3_EQCAHXkbAV3NcsGEPLl464S4rWnqjssD&share_app_id=1233&share_item_id=7022710108492696837&share_link_id=1D22A11A-9C5B-49E0-B90A-4D9B9849D136&source=h5_m&timestamp=1635730818&tt_from=copy&u_code=d5296kadhc54ad&user_id=6664336694672162821&utm_campaign=client_share&utm_medium=ios&utm_source=copy')
          const tikTokTrackingUrl = new TikTokTrackingUrl(url)
          const anonymizedUrl = new URL('https://m.tiktok.com/v/7022710108492696837')
          const tikTokTrackingUrlAnonymizer = new TikTokTrackingUrlAnonymizer(tikTokTrackingUrl)
          const result = tikTokTrackingUrlAnonymizer.anonymize()
          expect(result).toEqual(anonymizedUrl)
        })
      })
    })
  })
})
