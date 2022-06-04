const EventHandler = require('./EventHandler')
const SuccessfulResponse = require('../responses/SuccessfulResponse')
const constants = require('../../Constants')

describe('unit', () => {
  describe('constructor(event)', () => {
    describe('constructs successfully', () => {
      test('with a valid event', () => {
        const url = constants.unitTestTikTokTrackingUrl
        const event = {
          queryStringParameters: {
            url
          }
        }
        expect(new EventHandler(event)).toBeInstanceOf(EventHandler)
      })
    })

    describe('throws', () => {
      test('with null event', () => {
        expect(() => {
          new EventHandler(null)
        }).toThrow(new TypeError('event is null or undefined'))
      })

      test('with undefined error', () => {
        expect(() => {
          new EventHandler(undefined)
        }).toThrow(new TypeError('event is null or undefined'))
      })
    })
  })

  describe('fromEvent(event)', () => {
    test('returns an EventHandler instance', () => {
      const url = constants.unitTestTikTokTrackingUrl
      const event = {
        queryStringParameters: {
          url
        }
      }
      expect(EventHandler.fromEvent(event)).toBeInstanceOf(EventHandler)
    })
  })

  describe('handle()', () => {
    test('returns SuccessfulResponse serialized to an AWS response object', async () => {
      const url = constants.unitTestTikTokTrackingUrl
      const event = {
        queryStringParameters: {
          url
        }
      }
      const body = {url: constants.unitTestAnonymizedUrl}
      const successfulResponseObject = SuccessfulResponse.fromBody(body).toAwsResponseObject()
      const handleResult = await EventHandler.fromEvent(event).handle()
      expect(handleResult).toEqual(successfulResponseObject)
    })
  })
})

describe('integration', () => {
  describe('handle()', () => {
    test('returns SuccessfulResponse serialized to an AWS response object', async () => {
      // Mock console.warn so expected error output doesn't come through to the test log
      // TODO: Try and get https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest working so console.warn
      //  doesn't need to be mocked.
      const originalWarn = console.warn
      console.warn = jest.fn()
      const url = constants.integrationTestTikTokTrackingUrl
      const event = {
        queryStringParameters: {
          url
        }
      }
      const body = {url: constants.integrationTestAnonymizedUrl}
      const successfulResponseObject = SuccessfulResponse.fromBody(body).toAwsResponseObject()
      const handleResult = await EventHandler.fromEvent(event).handle()
      expect(handleResult).toEqual(successfulResponseObject)
      // Reset console.warn to original implementation
      console.warn = originalWarn
    })
  })
})


