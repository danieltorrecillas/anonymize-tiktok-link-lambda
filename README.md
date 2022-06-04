# anonymize-tiktok-link-lambda

This is an [AWS Lambda function](https://aws.amazon.com/lambda) that converts a
TikTok link embedded with user tracking into one without tracking. This function
is written in Javascript targeting the [Node.js](https://nodejs.org) runtime.

## Function Input

This function was developed with an architecture of client HTTP requests being
accepted from
[AWS API Gateway](https://aws.amazon.com/api-gateway) and passed to the
function.
More precisely, input to the function is an `event` from API Gateway to a Lambda
proxy integration where `event` format is specified
[here](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format).

Among all that data, this function only expects and uses a query string
parameter `url` which is the tracking URL to be converted.

For example,

```text
GET https://3rce4mrp80.execute-api.us-east-1.amazonaws.com/dev/convert?url=https://www.tiktok.com/t/ZTdtTNRjr --> event.queryStringParameters.url === 'https://www.tiktok.com/t/ZTdtTNRjr'
```

## Function Output

A "good" response is an `HTTP 200 OK` with sample JSON:

```json
{
  "url": "https://www.tiktok.com/@thetalkingbook/video/7053083465318878511"
}
```

where the value for `url` is the converted link.

There are two kinds of "bad" responses:  
1.) A video could not be found for the URL submitted. This is an
`HTTP 404 Not Found` with JSON:

```json
{
  "errorMessage": "Could not find a video for that link. Please double check and try again."
}
```

2.) Any other kind of error that may have occurred. The HTTP status codes will
vary. JSON will have an `errorMessage` property with a value that varies:

```json
{
  "errorMessage": "An unknown error occurred."
}
```

## Project Installation

This project uses [npm](https://www.npmjs.com) for dependency management. An
`install` at the root of the project gets you installed:

```text
$ npm install
```

## Project Testing

This project uses [jest](https://jestjs.io) for testing. There are two test
suites:

1.) Unit tests:

```text
$ npm run test-unit
```

2.) Integration tests:

```text
$ npm run test-integration
```

To run both unit and integration test suites:

```text
$ npm test
```

## Project Deployment

### AWS Prerequisites

1. You have a Lambda function with a Node.js runtime out in AWS.
2. You have access set up so that the AWS CLI can update the function.

### Deployment Script Prerequisites

1. You have [bash](https://www.gnu.org/software/bash/) or a `bash` compatible
   shell installed on your local machine.
2. You have
   the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
   [installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   on your local machine.
3. You have the AWS
   CLI [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
   for your AWS account.

### Deployment Script First Time Setup

[update-lambda.sample](update-lambda.sample) is a script that updates a Lambda
function with a .zip of required files. There is some one-time setup:

1. Copy `update-lambda.sample` and name it `update-lambda`:

```text
$ cp update-lambda.sample update-lambda
```

2. In `update-lambda`, edit `'YOUR_FUNCTION_NAME'` to be the name of your Lambda
   function.

### Run Deployment Script

In the root of the project:

```text
$ ./update-lambda
```
