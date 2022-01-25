const PresentableErrorResponse = require('../src/PresentableErrorResponse')

describe('unit', () => {
  describe('constructor(body)', () => {
    describe('constructs successfully', () => {
      test('with a body', () => {
        const body = {errorMessage: 'We\'re sorry; you have reached a number that has been disconnected or is no longer in service.'}
        expect(new PresentableErrorResponse(body)).toBeInstanceOf(PresentableErrorResponse)
      })

      test('without a body', () => {
        expect(new PresentableErrorResponse()).toBeInstanceOf(PresentableErrorResponse)
      })
    })

    describe('fromError(error)', () => {
      test('returns a PresentableErrorResponse instance', () => {
        const error = new Error('Missing required field')
        expect(PresentableErrorResponse.fromError(error)).toBeInstanceOf(PresentableErrorResponse)
      })
    })

    describe('toAwsResponseObject()', () => {
      test('returns object conforming to AWS Lambda output format', () => {
        const body = {errorMessage: 'Missing required field'}
        const awsResponseObject = {
          statusCode: 400,
          headers: {'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify(body)
        }
        const presentableErrorResponse = new PresentableErrorResponse(body)
        expect(presentableErrorResponse.toAwsResponseObject()).toEqual(awsResponseObject)
      })
    })
  })
})
