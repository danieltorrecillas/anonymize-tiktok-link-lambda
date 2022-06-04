const index = require('./index')
const constants = require('./Constants')
const EventHandler = require('./application/handlers/EventHandler')

describe('unit', () => {
  describe('handler(event)', () => {
    describe('returns output format of a Lambda function for proxy integration', () => {
      test('with a valid event', async () => {
        const url = constants.unitTestTikTokTrackingUrl
        const event = {
          queryStringParameters: {
            url
          }
        }
        const handlerResult = await index.handler(event)
        expect(handlerResult).toEqual(expect.objectContaining({
          statusCode: expect.any(Number),
          headers: expect.any(Object),
          body: expect.any(String)
        }))
      })

      test('with null event', async () => {
        // Mock console.error so expected error output doesn't come through to the test log
        const originalError = console.error
        console.error = jest.fn()
        const handlerResult = await index.handler(null)
        expect(handlerResult).toEqual(expect.objectContaining({
          statusCode: expect.any(Number),
          headers: expect.any(Object),
          body: expect.any(String)
        }))
        // Reset console.error to original implementation
        console.error = originalError
      })

      test('with undefined event', async () => {
        // Mock console.error so expected error output doesn't come through to the test log
        const originalError = console.error
        console.error = jest.fn()
        const handlerResult = await index.handler(undefined)
        expect(handlerResult).toEqual(expect.objectContaining({
          statusCode: expect.any(Number),
          headers: expect.any(Object),
          body: expect.any(String)
        }))
        // Reset console.error to original implementation
        console.error = originalError
      })

      test('with invalid event', async () => {
        // Mock console.error so expected error output doesn't come through to the test log
        const originalError = console.error
        console.error = jest.fn()
        const event = {
          queryStringParameters: {
            something: 'invalid'
          }
        }
        const handlerResult = await index.handler(event)
        expect(handlerResult).toEqual(expect.objectContaining({
          statusCode: expect.any(Number),
          headers: expect.any(Object),
          body: expect.any(String)
        }))
        // Reset console.error to original implementation
        console.error = originalError
      })
    })
  })
})

describe('integration', () => {
  describe('handler(event)', () => {
    describe('returns output format of a Lambda function for proxy integration', () => {
      test('with a valid event', async () => {
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
        const handlerResult = await index.handler(event)
        expect(handlerResult).toEqual(expect.objectContaining({
          statusCode: expect.any(Number),
          headers: expect.any(Object),
          body: expect.any(String)
        }))
        // Reset console.warn to original implementation
        console.warn = originalWarn
      })
    })
  })
})
