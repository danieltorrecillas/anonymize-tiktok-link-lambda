const UnexpectedErrorResponse = require('../src/UnexpectedErrorResponse')

describe('unit', () => {
  describe('constructor(body)', () => {
    describe('constructs successfully', () => {
      test('with a body', () => {
        const body = {errorMessage: 'Something unexpected happened'}
        expect(new UnexpectedErrorResponse(body)).toBeInstanceOf(UnexpectedErrorResponse)
      })

      test('without a body', () => {
        expect(new UnexpectedErrorResponse()).toBeInstanceOf(UnexpectedErrorResponse)
      })
    })

    describe('createWithDefaultBody()', () => {
      test('returns a UnexpectedErrorResponse instance', () => {
        expect(UnexpectedErrorResponse.createWithDefaultBody()).toBeInstanceOf(UnexpectedErrorResponse)
      })
    })

    describe('toAwsResponseObject()', () => {
      test('returns object conforming to AWS Lambda output format', () => {
        const body = {errorMessage: 'Something unexpected happened'}
        const awsResponseObject = {
          statusCode: 500,
          headers: {'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify(body)
        }
        const unexpectedErrorResponse = new UnexpectedErrorResponse(body)
        expect(unexpectedErrorResponse.toAwsResponseObject()).toEqual(awsResponseObject)
      })
    })
  })
})
