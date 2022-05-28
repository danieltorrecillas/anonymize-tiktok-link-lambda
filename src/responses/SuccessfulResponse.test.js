const SuccessfulResponse = require('./SuccessfulResponse')
const constants = require('../Constants')

describe('unit', () => {
  describe('constructor(body)', () => {
    describe('constructs successfully', () => {
      test('with a body', () => {
        const body = {url: constants.unitTestAnonymizedUrl}
        expect(new SuccessfulResponse(body)).toBeInstanceOf(SuccessfulResponse)
      })
    })

    describe('throws', () => {
      test('with null url', () => {
        expect(() => {
          new SuccessfulResponse(null)
        }).toThrow(new TypeError('body is null or undefined'))
      })

      test('with undefined url', () => {
        expect(() => {
          new SuccessfulResponse(undefined)
        }).toThrow(new TypeError('body is null or undefined'))
      })
    })

    describe('fromBody(body)', () => {
      test('returns a SuccessfulResponse instance', () => {
        const body = {url: constants.unitTestAnonymizedUrl}
        expect(SuccessfulResponse.fromBody(body)).toBeInstanceOf(SuccessfulResponse)
      })
    })

    describe('toAwsResponseObject()', () => {
      test('returns object conforming to AWS Lambda output format', () => {
        const body = {url: constants.unitTestAnonymizedUrl}
        const awsResponseObject = {
          statusCode: 200,
          headers: {'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify(body)
        }
        const successfulResponse = new SuccessfulResponse(body)
        expect(successfulResponse.toAwsResponseObject()).toEqual(awsResponseObject)
      })
    })
  })
})
