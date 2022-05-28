const AwsEvent = require('./AwsEvent')
const PresentableError = require('./PresentableError')
const constants = require('./Constants')

describe('unit', () => {
  describe('constructor(event)', () => {
    describe('constructs successfully', () => {
      test(`when event.queryStringParameters.url = "${constants.unitTestTikTokTrackingUrl}"`, () => {
        const url = constants.unitTestTikTokTrackingUrl
        const event = {
          queryStringParameters: {
            url
          }
        }

        const awsEvent = new AwsEvent(event)
        expect(awsEvent.searchUrl).toEqual(new URL(url))
      })
    })

    describe('throws', () => {
      test('with null event', () => {
        expect(() => {
          const awsEvent = new AwsEvent(null)
        }).toThrow(new TypeError('Event malformed. Expected a URL with a query string of "url".'))
      })

      test('with undefined event', () => {
        expect(() => {
          new AwsEvent(undefined)
        }).toThrow(new TypeError('Event malformed. Expected a URL with a query string of "url".'))
      })

      test('when event.queryStringParameters == null', () => {
        expect(() => {
          const event = {}
          new AwsEvent(event)
        }).toThrow(new TypeError('Event malformed. Expected a URL with a query string of "url".'))
      })

      test('when event.queryStringParameters.url == null', () => {
        expect(() => {
          const event = {
            queryStringParameters: {}
          }
          new AwsEvent(event)
        }).toThrow(new TypeError('Event malformed. Expected a URL with a query string of "url".'))
      })

      test('when event.queryStringParameters.url isnt even a string', () => {
        expect(() => {
          const event = {
            queryStringParameters: {
              url: 5
            }
          }
          new AwsEvent(event)
        }).toThrow(new TypeError('Event malformed. Expected a URL with a query string of "url".'))
      })

      test('when event.queryStringParameters.url === ""', () => {
        expect(() => {
          const event = {
            queryStringParameters: {
              url: ''
            }
          }
          new AwsEvent(event)
        }).toThrow(new RangeError('The URL is empty.'))
      })

      test('when event.queryStringParameters.url === "not a properly formed URL"', () => {
        expect(() => {
          const event = {
            queryStringParameters: {
              url: 'not a properly formed URL'
            }
          }
          new AwsEvent(event)
        }).toThrow(new PresentableError('The URL entered is not a valid URL'))
      })
    })
  })
})
