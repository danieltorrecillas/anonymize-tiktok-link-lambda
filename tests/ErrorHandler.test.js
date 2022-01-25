const ErrorHandler = require('../src/ErrorHandler')
const PresentableError = require('../src/PresentableError')
const PresentableErrorResponse = require('../src/PresentableErrorResponse')
const UnexpectedErrorResponse = require('../src/UnexpectedErrorResponse')

describe('unit', () => {
  describe('constructor(error)', () => {
    describe('constructs successfully', () => {
      test('with a valid error', () => {
        const error = new PresentableError('First name cannot contain numbers')
        expect(new ErrorHandler(error)).toBeInstanceOf(ErrorHandler)
      })
    })

    describe('throws', () => {
      test('with null error', () => {
        expect(() => {
          new ErrorHandler(null)
        }).toThrow(new TypeError('error is null or undefined'))
      })

      test('with undefined error', () => {
        expect(() => {
          new ErrorHandler(undefined)
        }).toThrow(new TypeError('error is null or undefined'))
      })

      test('when error is not an Error', () => {
        expect(() => {
          new ErrorHandler('Something bad happened')
        }).toThrow(new TypeError('error is not an Error'))
      })

    })

    describe('fromError(error)', () => {
      test('returns an ErrorHandler instance', () => {
        const error = new TypeError('Expected this type to be something else')
        expect(ErrorHandler.fromError(error)).toBeInstanceOf(ErrorHandler)
      })
    })

    describe('handle()', () => {
      describe('returns PresentableErrorResponse serialized to an AWS response object', () => {
        test('when this.#error is an instance of PresentableError', () => {
          // Mock console.error so expected error output doesn't come through to the test log
          const originalError = console.error
          console.error = jest.fn()
          const presentableError = new PresentableError('Last name cannot have numbers')
          const awsResponseObjectFromPresentableErrorResponse = PresentableErrorResponse.fromError(presentableError).toAwsResponseObject()
          const handleResult = ErrorHandler.fromError(presentableError).handle()
          expect(handleResult).toEqual(awsResponseObjectFromPresentableErrorResponse)
          // Reset console.error to original implementation
          console.error = originalError
        })
      })

      describe('returns UnexpectedErrorResponse serialized to an AWS response object', () => {
        test('when this.#error is NOT an instance of PresentableError)', () => {
          // Mock console.error so expected error output doesn't come through to the test log
          const originalError = console.error
          console.error = jest.fn()
          const typeError = new TypeError('Error occurred')
          const awsResponseObjectFromUnexpectedErrorResponse = UnexpectedErrorResponse.createWithDefaultBody().toAwsResponseObject()
          const handleResult = ErrorHandler.fromError(typeError).handle()
          expect(handleResult).toEqual(awsResponseObjectFromUnexpectedErrorResponse)
          // Reset console.error to original implementation
          console.error = originalError
        })
      })
    })
  })
})
