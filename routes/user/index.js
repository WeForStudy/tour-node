const model = require('../model')
const methods = require('../methods')
module.exports = {
  ...model,
  'single': { method: methods.post },
}
