const EventHandler = require('./application/handlers/EventHandler')
const ErrorHandler = require('./application/handlers/ErrorHandler')

exports.handler = async event => {
  try {
    return await EventHandler.fromEvent(event).handle()
  } catch (error) {
    return ErrorHandler.fromError(error).handle()
  }
}
