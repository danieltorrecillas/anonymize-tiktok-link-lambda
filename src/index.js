const EventHandler = require('./EventHandler')
const ErrorHandler = require('./ErrorHandler')

exports.handler = async event => {
  try {
    return await EventHandler.fromEvent(event).handle()
  } catch (error) {
    return ErrorHandler.fromError(error).handle()
  }
}
