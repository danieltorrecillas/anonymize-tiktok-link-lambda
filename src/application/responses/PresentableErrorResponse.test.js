const PresentableErrorResponse = require('./PresentableErrorResponse')
const PresentableError = require('../../domain/errors/PresentableError')

describe('unit', () => {
  describe('constructor(body)', () => {
    describe('constructs successfully', () => {
      test('with a httpStatusCode and body', () => {
        const httpStatusCode = 404
        const body = {errorMessage: 'We\'re sorry; you have reached a number that has been disconnected or is no longer in service.'}
        expect(new PresentableErrorResponse(httpStatusCode, body)).toBeInstanceOf(PresentableErrorResponse)
      })

      test('with a httpStatusCode and without a body', () => {
        expect(new PresentableErrorResponse(502)).toBeInstanceOf(PresentableErrorResponse)
      })
    })

    describe('throws', () => {
      const body = {errorMessage: 'We\'re sorry; you have reached a number that has been disconnected or is no longer in service.'}

      test('with null httpStatusCode', () => {
        expect(() => {
          new PresentableErrorResponse(null, body)
        }).toThrow(new TypeError('httpStatusCode is null or undefined'))
      })

      test('with undefined httpStatusCode', () => {
        expect(() => {
          new PresentableErrorResponse(undefined, body)
        }).toThrow(new TypeError('httpStatusCode is null or undefined'))
      })

      test('with no httpStatusCode', () => {
        expect(() => {
          new PresentableErrorResponse(body)
        }).toThrow(new TypeError('httpStatusCode is not a number'))
      })
    })
  })

  describe('fromError(error)', () => {
    test('returns a PresentableErrorResponse instance', () => {
      const error = new PresentableError(400, 'Missing required field')
      expect(PresentableErrorResponse.fromError(error)).toBeInstanceOf(PresentableErrorResponse)
    })
  })

  describe('toAwsResponseObject()', () => {
    test('returns object conforming to AWS Lambda output format', () => {
      const body = {errorMessage: 'Missing required field'}
      const httpStatusCode = 500
      const awsResponseObject = {
        statusCode: httpStatusCode,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(body)
      }
      const presentableErrorResponse = new PresentableErrorResponse(httpStatusCode, body)
      expect(presentableErrorResponse.toAwsResponseObject()).toEqual(awsResponseObject)
    })
  })
})
