const model = require('../model')
const controller = require('../../controller/guider')
const pojo = require('../../helper/pojo')
const { success, failed, filterUnderLine }  = pojo
const m  = model([
  'list',
  'add',
  'update',
  'del'
], 'guider')
const single = async ctx => {
  let res;
  try {
    const val = ctx.request.body
    await controller.single(val).then(result => {
      if(result.length === 0 || result === null || result === undefined)  
        res = failed('操作失败')
      else 
        res = success(filterUnderLine(result[0]))
    })
  } catch(err) {
    res = failed(err)
  }
  ctx.body = res
}
module.exports = {
  ...m,
  single,
}
