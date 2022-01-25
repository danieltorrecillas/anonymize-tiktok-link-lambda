const {rest} = require('msw')
const constants = require('../Constants')

const handlers = [
  rest.head(constants.unitTestTikTokTrackingUrl, (req, res, ctx) => {
    const url = constants.unitTestFirstRedirectedTikTokTrackingUrl
    return res(
      ctx.status(301),
      ctx.set('Location', url)
    )
  })
]

module.exports = handlers
